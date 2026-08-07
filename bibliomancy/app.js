const API_URL = 'https://en.wikipedia.org/w/api.php';
const FIRST_PART_MAX_PARAGRAPHS = 8;
const MIN_IMAGE_BYTES = 3000;
const MIN_IMAGE_WIDTH = 100;
const MAX_ARTICLE_ATTEMPTS = 20;
const MIN_LINE_WORDS = 1;
const MAX_LINE_WORDS = 7;
const NUM_TEXT_LINES = 3;

const STOP_HEADINGS = new Set([
    'references', 'external links', 'see also', 'further reading',
    'bibliography', 'notes', 'citations', 'sources'
]);
const MONTHS = new Set([
    'january', 'february', 'march', 'april', 'may', 'june', 'july',
    'august', 'september', 'october', 'november', 'december'
]);
const ABBREVIATIONS = [
    'Mr.', 'Mrs.', 'Dr.', 'Prof.', 'St.', 'vs.', 'etc.', 'e.g.', 'i.e.',
    'U.S.', 'U.K.', 'D.C.', 'Ph.D.', 'Jr.', 'Sr.', 'a.m.', 'p.m.'
];
const EXCLUDED_IMAGE_KEYWORDS = [
    'lock', 'padlock', 'protection', 'wiki', 'commons-logo', 'wikidata',
    'wiktionary', 'wikiquote', 'wikisource', 'wikinews', 'wikibooks',
    'wikiversity', 'wikivoyage', 'question_book', 'ambox', 'edit-icon',
    'edit-clear', 'disambig', 'oojs', 'folder', 'icon', 'symbol', 'signature',
    'graph', 'chart', 'diagram', 'plot', 'flag', 'seal', 'coat_of_arms',
    'coatofarms', 'crest', 'emblem', 'map'
];
const WEAK_STARTS = new Set([
    'and', 'or', 'but', 'because', 'although', 'however', 'therefore', 'thus',
    'also', 'meanwhile', 'additionally', 'consequently', 'of', 'to', 'with',
    'for', 'from', 'by', 'as', 'into', 'than', 'that', 'which'
]);
const WEAK_ENDS = new Set([
    'and', 'or', 'but', 'because', 'the', 'a', 'an', 'of', 'to', 'with', 'for',
    'from', 'by', 'as', 'into', 'than', 'that', 'which', 'also', 'too', 'then',
    'just', 'very', 'quite', 'still', 'even', 'however', 'therefore', 'thus',
    'my', 'your', 'his', 'her', 'its', 'our', 'their'
]);
const AUXILIARY_STARTS = new Set([
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'am', 'do', 'does',
    'did', 'has', 'have', 'had', 'can', 'could', 'will', 'would', 'shall',
    'should', 'may', 'might', 'must'
]);
const BANNED_WORDS = new Set([
    'city', 'province', 'municipality', 'population', 'district', 'located',
    'according', 'species', 'genus', 'family', 'county', 'born', 'died',
    'president', 'football', 'club', 'season', 'album', 'single', 'episode',
    'infobox', 'citation', 'isbn', 'website', 'trademark', 'interface'
]);
const TECHNICAL_PHRASES = new Set([
    'graphical user interface', 'user interface', 'operating system'
]);
const DANGLING_ENDINGS = new Set([
    'available', 'current', 'different', 'ecological', 'economic', 'former',
    'general', 'graphical', 'historical', 'international', 'latter', 'local',
    'major', 'minor', 'modern', 'national', 'original', 'other', 'political',
    'possible', 'private', 'public', 'several', 'similar', 'social', 'various'
]);
const GEOGRAPHIC_NAMES = [
    'africa', 'antarctica', 'asia', 'australia', 'europe', 'north america',
    'south america', 'central america', 'middle east', 'latin america',
    'caribbean', 'west africa', 'east africa', 'united states',
    'united kingdom', 'new zealand', 'south africa', 'saudi arabia',
    'argentina', 'austria', 'belgium', 'brazil', 'canada', 'chile', 'china',
    'colombia', 'croatia', 'cuba', 'denmark', 'egypt', 'finland', 'france',
    'germany', 'greece', 'india', 'indonesia', 'iran', 'iraq', 'ireland',
    'israel', 'italy', 'japan', 'kenya', 'mexico', 'morocco', 'netherlands',
    'nigeria', 'norway', 'pakistan', 'peru', 'poland', 'portugal', 'russia',
    'serbia', 'spain', 'sweden', 'switzerland', 'thailand', 'turkey',
    'ukraine', 'vietnam'
];

let drawing = false;
let randomArticlePool = [];
let currentPhotoUrl = null;

function shuffled(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
}

function headingStopsSelection(element) {
    const heading = element.textContent.trim().toLowerCase();
    return [...STOP_HEADINGS].some(stop => heading.includes(stop));
}

function openingContent(html, removeSuperscripts = false) {
    const documentFragment = new DOMParser().parseFromString(html, 'text/html');
    const content = documentFragment.querySelector('#mw-content-text') || documentFragment;
    if (removeSuperscripts) {
        content.querySelectorAll('sup').forEach(element => element.remove());
    }
    return content;
}

function getFirstPartText(html) {
    const chunks = [];
    for (const element of openingContent(html, true).querySelectorAll('p, h2, h3')) {
        if (element.matches('h2, h3')) {
            if (headingStopsSelection(element)) {
                break;
            }
            continue;
        }
        if (element.closest('table')) {
            continue;
        }
        const text = element.textContent.trim();
        if (text) {
            chunks.push(text);
        }
        if (chunks.length >= FIRST_PART_MAX_PARAGRAPHS) {
            break;
        }
    }
    return chunks.join(' ');
}

function getOpeningLinkTexts(html) {
    const links = new Set();
    let paragraphs = 0;
    for (const element of openingContent(html).querySelectorAll('p, h2, h3')) {
        if (element.matches('h2, h3')) {
            if (headingStopsSelection(element)) {
                break;
            }
            continue;
        }
        if (element.closest('table')) {
            continue;
        }
        element.querySelectorAll('a[href]').forEach(anchor => {
            const label = anchor.textContent.trim().replace(/\s+/g, ' ');
            if (label) {
                links.add(label);
            }
        });
        paragraphs += 1;
        if (paragraphs >= FIRST_PART_MAX_PARAGRAPHS) {
            break;
        }
    }
    return links;
}

function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function linkSpans(fragment, linkTexts) {
    const spans = [];
    const labels = [...linkTexts].sort((first, second) => second.length - first.length);
    for (const label of labels) {
        const pattern = new RegExp(
            `(^|[^A-Za-z0-9'-])(${escapeRegExp(label)})(?=$|[^A-Za-z0-9'-])`,
            'gi'
        );
        let match;
        while ((match = pattern.exec(fragment)) !== null) {
            const start = match.index + match[1].length;
            const end = start + match[2].length;
            const overlaps = spans.some(span => start < span.end && end > span.start);
            if (!overlaps) {
                spans.push({ start, end });
            }
            if (match[0].length === 0) {
                pattern.lastIndex += 1;
            }
        }
    }
    return spans.sort((first, second) => first.start - second.start);
}

function splitSentences(text) {
    let protectedText = text;
    ABBREVIATIONS.forEach((abbreviation, index) => {
        const token = abbreviation.replaceAll('.', `@@${index}@@`);
        protectedText = protectedText.replaceAll(abbreviation, token);
    });

    const sentences = protectedText.split(/(?<=[.!?])\s+(?=[A-Z])/);
    return sentences.map(sentence => {
        let restored = sentence;
        ABBREVIATIONS.forEach((abbreviation, index) => {
            const token = abbreviation.replaceAll('.', `@@${index}@@`);
            restored = restored.replaceAll(token, abbreviation);
        });
        return restored.trim();
    }).filter(Boolean);
}

function containsDate(text) {
    const words = text.match(/[A-Za-z0-9']+/g) || [];
    return words.some(word => {
        const lowered = word.toLowerCase();
        return MONTHS.has(lowered)
            || /^\d{1,2}(st|nd|rd|th)$/.test(lowered)
            || (/^\d{4}$/.test(word) && Number(word) >= 1000 && Number(word) <= 2099);
    });
}

function looksLikeListRemnant(text) {
    return /^\d+[.)]\s/.test(text.trim());
}

function cleanFragment(text) {
    return text.trim().replace(/^[ ,;:.!?—–"']+|[ ,;:.!?—–"']+$/g, '');
}

function fragmentPassesFilter(fragment, minWords = MIN_LINE_WORDS, maxWords = MAX_LINE_WORDS) {
    const raw = fragment.trim();
    const clean = cleanFragment(raw);
    if (!clean || /\([^)]*\)|\[[^\]]*\]/.test(raw) || containsDate(raw) || /\d/.test(raw)) {
        return false;
    }

    const words = clean.split(/\s+/);
    const lowered = words.map(word => word.toLowerCase());
    const wordPattern = /^[A-Za-z]+(?:['-][A-Za-z]+)*$/;
    if (words.length < minWords || words.length > maxWords
            || !words.every(word => wordPattern.test(word))) {
        return false;
    }
    if (WEAK_STARTS.has(lowered[0])
            || AUXILIARY_STARTS.has(lowered[0])
            || WEAK_ENDS.has(lowered[lowered.length - 1])
            || DANGLING_ENDINGS.has(lowered[lowered.length - 1])) {
        return false;
    }
    if (TECHNICAL_PHRASES.has(lowered.join(' '))
            || lowered.some(word => BANNED_WORDS.has(word))) {
        return false;
    }
    return true;
}

function extractCommaClause(sentence, lineNumber, minWords = MIN_LINE_WORDS, maxWords = MAX_LINE_WORDS) {
    const cleanSentence = sentence.trim();
    if (!/[.!?]["')\]]*$/.test(cleanSentence)) {
        return null;
    }

    const parts = cleanSentence.split(',').map(part => part.trim());
    let choices = [];
    if (lineNumber === 1 && parts.length >= 2) {
        choices = parts.slice(0, 1);
    } else if (lineNumber === 2) {
        choices = parts.slice(1, -1);
    } else if (lineNumber === 3 && parts.length >= 2) {
        choices = parts.slice(-1);
    }

    for (const clause of shuffled(choices)) {
        const clean = cleanFragment(clause);
        if (fragmentPassesFilter(clean, minWords, maxWords)) {
            return clean;
        }
    }
    return null;
}

function containsGeography(text) {
    const lowered = text.toLowerCase();
    return GEOGRAPHIC_NAMES.some(name => {
        return new RegExp(`\\b${escapeRegExp(name)}\\b`).test(lowered);
    });
}

async function fetchJson(params) {
    params.set('format', 'json');
    params.set('formatversion', '2');
    params.set('origin', '*');
    for (let attempt = 0; attempt < 3; attempt += 1) {
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 10000);
        try {
            const response = await fetch(`${API_URL}?${params}`, { signal: controller.signal });
            if ((response.status === 429 || response.status === 503) && attempt < 2) {
                const retryAfter = Number.parseInt(response.headers.get('retry-after'), 10);
                const delay = Number.isFinite(retryAfter)
                    ? Math.min(retryAfter * 1000, 5000)
                    : 1200 * (attempt + 1);
                await new Promise(resolve => window.setTimeout(resolve, delay));
                continue;
            }
            if (!response.ok) {
                throw new Error(`Wikipedia returned ${response.status}`);
            }
            return await response.json();
        } finally {
            window.clearTimeout(timeout);
        }
    }
    throw new Error('Wikipedia did not answer');
}

async function refillRandomArticlePool() {
    const params = new URLSearchParams({
        action: 'query',
        generator: 'random',
        grnnamespace: '0',
        grnfilterredir: 'nonredirects',
        grnlimit: '20',
        prop: 'info',
        inprop: 'url'
    });
    const data = await fetchJson(params);
    randomArticlePool = shuffled((data.query && data.query.pages) || []);
    if (!randomArticlePool.length) {
        throw new Error('Wikipedia returned no random articles');
    }
}

async function fetchRandomArticle() {
    if (!randomArticlePool.length) {
        await refillRandomArticlePool();
    }
    const article = randomArticlePool.pop();
    const params = new URLSearchParams({
        action: 'parse',
        pageid: String(article.pageid),
        prop: 'text',
        disableeditsection: '1',
        disablelimitreport: '1'
    });
    const data = await fetchJson(params);
    return {
        ...article,
        html: data.parse && data.parse.text ? data.parse.text : ''
    };
}

async function drawLine(used, lineNumber, geographyUsed) {
    for (let attempt = 0; attempt < MAX_ARTICLE_ATTEMPTS; attempt += 1) {
        const article = await fetchRandomArticle();
        if (used.has(article.pageid)) {
            continue;
        }
        used.add(article.pageid);

        const linkTexts = getOpeningLinkTexts(article.html);
        const sentences = shuffled(splitSentences(getFirstPartText(article.html)));
        for (const sentence of sentences) {
            if (containsDate(sentence) || looksLikeListRemnant(sentence)) {
                continue;
            }
            const clause = extractCommaClause(sentence, lineNumber);
            const hasGeography = Boolean(clause && containsGeography(clause));
            if (clause && (!geographyUsed || !hasGeography)) {
                return { text: clause, links: linkTexts, hasGeography };
            }
        }
    }
    return { text: '...', links: new Set(), hasGeography: false };
}

function imageFilename(source) {
    try {
        return decodeURIComponent(new URL(source, 'https://en.wikipedia.org').pathname.split('/').pop()).toLowerCase();
    } catch (error) {
        return source.toLowerCase();
    }
}

function imageSourceAllowed(source) {
    // Every public image URL contains “wikimedia”, so apply the desktop
    // exclusion list to the actual filename rather than the transport host.
    const filename = imageFilename(source);
    return (filename.endsWith('.jpg') || filename.endsWith('.jpeg'))
        && !EXCLUDED_IMAGE_KEYWORDS.some(keyword => filename.includes(keyword));
}

async function drawPhoto(used) {
    for (let attempt = 0; attempt < MAX_ARTICLE_ATTEMPTS; attempt += 1) {
        const article = await fetchRandomArticle();
        if (used.has(article.pageid)) {
            continue;
        }
        used.add(article.pageid);

        const content = openingContent(article.html);
        for (const imageElement of content.querySelectorAll('img')) {
            const source = imageElement.getAttribute('src');
            if (!source || !imageSourceAllowed(source)) {
                continue;
            }
            const width = Number.parseInt(imageElement.getAttribute('width'), 10);
            if (Number.isFinite(width) && width < MIN_IMAGE_WIDTH) {
                continue;
            }
            try {
                const imageUrl = new URL(source, 'https://en.wikipedia.org').href;
                const response = await fetch(imageUrl);
                if (!response.ok) {
                    continue;
                }
                const blob = await response.blob();
                if (blob.size < MIN_IMAGE_BYTES) {
                    continue;
                }
                return {
                    url: URL.createObjectURL(blob),
                    title: article.title
                };
            } catch (error) {
                continue;
            }
        }
    }
    return null;
}

function renderLine(element, text, links) {
    element.replaceChildren();
    let cursor = 0;
    for (const span of linkSpans(text, links)) {
        element.append(document.createTextNode(text.slice(cursor, span.start)));
        const linkedText = document.createElement('span');
        linkedText.className = 'link';
        linkedText.textContent = text.slice(span.start, span.end);
        element.append(linkedText);
        cursor = span.end;
    }
    element.append(document.createTextNode(text.slice(cursor)));
}

function showSingleLine(text) {
    const stage = document.getElementById('stage');
    const lineElements = document.querySelectorAll('#lines p');
    stage.classList.add('single-line');
    renderLine(lineElements[0], text, new Set());
    lineElements[1].replaceChildren();
    lineElements[2].replaceChildren();
}

async function draw() {
    if (drawing) {
        return;
    }
    drawing = true;

    const stage = document.getElementById('stage');
    const button = document.getElementById('draw-button');
    const image = document.getElementById('chance-image');
    button.disabled = true;
    stage.setAttribute('aria-busy', 'true');
    image.hidden = true;
    showSingleLine('Drawing...');

    const used = new Set();
    const lines = [];
    let geographyUsed = false;
    let linesRendered = false;
    try {
        for (let lineNumber = 1; lineNumber <= NUM_TEXT_LINES; lineNumber += 1) {
            const line = await drawLine(used, lineNumber, geographyUsed);
            lines.push(line);
            geographyUsed = geographyUsed || line.hasGeography;
        }

        stage.classList.remove('single-line');
        document.querySelectorAll('#lines p').forEach((element, index) => {
            renderLine(element, lines[index].text, lines[index].links);
        });
        linesRendered = true;

        const photo = await drawPhoto(used);
        if (photo) {
            if (currentPhotoUrl) {
                URL.revokeObjectURL(currentPhotoUrl);
            }
            currentPhotoUrl = photo.url;
            image.src = photo.url;
            image.alt = `Chance-selected image from the Wikipedia article “${photo.title}”`;
            image.hidden = false;
        } else {
            image.hidden = true;
            image.removeAttribute('src');
            image.alt = '';
        }
    } catch (error) {
        console.error('Bibliomancy draw failed:', error);
        if (!linesRendered) {
            showSingleLine("Press space, or 'Draw'");
        }
    } finally {
        button.disabled = false;
        stage.removeAttribute('aria-busy');
        drawing = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('draw-button');
    button.addEventListener('click', draw);
    document.addEventListener('keydown', event => {
        if (event.code === 'Space') {
            event.preventDefault();
            draw();
        }
    });
});
