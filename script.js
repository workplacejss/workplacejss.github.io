// main.js

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    const worksItems = document.querySelectorAll('#works-list a');
    const researchItems = document.querySelectorAll('#research-list a');
    const menuItems = document.querySelectorAll('#menu a, #works-btn, #research-btn');

    function markClicked(item) {
        item.style.color = '#551A8B';
        item.classList.add('clicked');
    }

    function resetUnclicked() {
        menuItems.forEach(link => {
            if (!link.classList.contains('clicked')) {
                link.style.color = '#0000EE';
            }
        });
    }

    // Apply click handlers to all menu buttons
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(link => link.classList.remove('clicked'));
            markClicked(this);
            resetUnclicked();
        });
    });

    // Click inside works or research items (nested)
    [...worksItems, ...researchItems].forEach(item => {
        item.addEventListener('click', function() {
            markClicked(this);
        });
    });
});

// Toggle Works List
function toggleWorks() {
    const worksList = document.getElementById('works-list');
    const worksBtn = document.getElementById('works-btn');

    const isOpen = worksList.style.display === 'block';
    worksList.style.display = isOpen ? 'none' : 'block';
    worksBtn.style.color = isOpen ? '#0000EE' : '#551A8B';
}

// Toggle Research List
function toggleResearch() {
    const researchList = document.getElementById('research-list');
    const researchBtn = document.getElementById('research-btn');

    const isOpen = researchList.style.display === 'block';
    researchList.style.display = isOpen ? 'none' : 'block';
    researchBtn.style.color = isOpen ? '#0000EE' : '#551A8B';
}

// Show work or research content
function showWork(workId) {
    // Hide all content blocks
    document.querySelectorAll('.work-content, .research-content').forEach(div => {
        div.style.display = 'none';
    });

    // Show selected item
    const selected = document.getElementById(workId);
    if (!selected) return;

    const isResearch = workId.startsWith('research');
    document.getElementById('work-content').style.display = isResearch ? 'none' : 'block';
    document.getElementById('research-content').style.display = isResearch ? 'block' : 'none';

    selected.style.display = 'block';
}

// Show About section
function showAbout() {
    hideAllContent();
    document.getElementById('about-section').style.display = 'block';
}

// Show Contact section
function showContact() {
    hideAllContent();
    document.getElementById('contact-section').style.display = 'block';
}

// Utility to hide all content
function hideAllContent() {
    document.querySelectorAll('.work-content, .research-content, #about-section, #contact-section')
        .forEach(div => div.style.display = 'none');
} 

// Initial state
window.onload = function() {
    document.querySelectorAll('#menu a, #works-btn, #research-btn').forEach(item => {
        item.style.color = '#0000EE';
        item.classList.remove('clicked');
    });

    document.getElementById('header-title').style.color = '#000000';
};
