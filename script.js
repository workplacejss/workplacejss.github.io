const VISITED_PURPLE = '#551A8B';

function markClicked(item) {
    if (!item) {
        return;
    }
    item.classList.add('clicked');
    item.style.color = VISITED_PURPLE;
}

function hideAllViews() {
    document.querySelectorAll('.work-content, .research-content').forEach(element => {
        element.style.display = 'none';
    });
    const researchBox = document.getElementById('research-box');
    if (researchBox) {
        researchBox.style.display = 'none';
    }
}

function linkForHash(containerSelector, hash) {
    return [...document.querySelectorAll(`${containerSelector} a`)].find(link => {
        return link.getAttribute('href') === `#${hash}`;
    });
}

function rememberLink(event) {
    event.preventDefault();
    markClicked(event.currentTarget);

    const hash = event.currentTarget.getAttribute('href');
    if (hash && hash !== '#' && window.location.hash !== hash) {
        window.history.pushState(null, '', hash);
    }
    applyRouteFromUrl();
}

function toggleWorks() {
    const worksList = document.getElementById('works-list');
    const researchList = document.getElementById('research-list');
    const worksButton = document.getElementById('works-btn');

    if (researchList.style.display === 'block') {
        researchList.style.display = 'none';
    }
    worksList.style.display = worksList.style.display === 'block' ? 'none' : 'block';
    markClicked(worksButton);
}

function toggleResearch() {
    const researchList = document.getElementById('research-list');
    const worksList = document.getElementById('works-list');
    const researchButton = document.getElementById('research-btn');

    if (worksList.style.display === 'block') {
        worksList.style.display = 'none';
    }
    researchList.style.display = researchList.style.display === 'block' ? 'none' : 'block';
    markClicked(researchButton);
}

function showWork(workId) {
    const selectedWork = document.getElementById(workId);
    if (!selectedWork) {
        return;
    }

    hideAllViews();
    selectedWork.style.display = 'block';
    markClicked(linkForHash('#works-list', workId));
    markClicked(document.getElementById('works-btn'));
}

function showAbout() {
    hideAllViews();
    document.getElementById('about-section').style.display = 'block';
    markClicked(document.getElementById('about-btn'));
}

function showContact() {
    hideAllViews();
    document.getElementById('contact-section').style.display = 'block';
    markClicked(document.getElementById('contact-btn'));
}

function showResearch(researchId) {
    const selectedResearch = document.getElementById(researchId);
    const researchBox = document.getElementById('research-box');

    hideAllViews();
    if (selectedResearch) {
        researchBox.innerHTML = selectedResearch.innerHTML;
    } else {
        researchBox.innerHTML = '<p>Select a research topic to view details.</p>';
    }
    researchBox.style.display = 'block';
    markClicked(linkForHash('#research-list', researchId));
    markClicked(document.getElementById('research-btn'));
}

function applyRouteFromUrl() {
    let route;
    try {
        route = decodeURIComponent(window.location.hash.slice(1));
    } catch (error) {
        return;
    }

    if (!route) {
        hideAllViews();
        return;
    }
    if (route === 'about' || route === 'about-section') {
        showAbout();
        return;
    }
    if (route === 'contact' || route === 'contact-section') {
        showContact();
        return;
    }

    const target = document.getElementById(route);
    if (!target) {
        return;
    }
    if (target.classList.contains('work-content')) {
        showWork(route);
    } else if (target.classList.contains('research-content') && route !== 'research-box') {
        showResearch(route);
    }
}

// The bibliomancy section previously missed its closing div. Browsers therefore
// treated every later work as a child of it, so hiding bibliomancy also hid all
// subsequent works. Normalize that malformed nesting until the HTML is cleaned
// up, and move the Wikimancy description out of the iframe's sizing wrapper.
function repairBibliomancyMarkup() {
    const bibliomancy = document.getElementById('bibliomancy');
    const worksContainer = document.getElementById('work-content');
    if (!bibliomancy || !worksContainer) {
        return;
    }

    [...bibliomancy.querySelectorAll('.work-content, .research-content')]
        .filter(element => element !== bibliomancy)
        .forEach(element => worksContainer.appendChild(element));

    const workBox = bibliomancy.querySelector('.work-box');
    const frameWrapper = workBox && workBox.querySelector(':scope > div');
    if (frameWrapper) {
        [...frameWrapper.querySelectorAll(':scope > p')]
            .forEach(paragraph => frameWrapper.after(paragraph));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    repairBibliomancyMarkup();
    document.getElementById('header-title').style.color = '#000000';

    document.querySelectorAll('#works-list a, #research-list a, #about-btn, #contact-btn')
        .forEach(link => link.addEventListener('click', rememberLink));

    applyRouteFromUrl();
});

window.addEventListener('hashchange', applyRouteFromUrl);
