document.addEventListener('DOMContentLoaded', function() {
    const worksItems = document.querySelectorAll('#works-list a');
    const researchItems = document.querySelectorAll('#research-list a');
    const menuItems = document.querySelectorAll('#menu a, #works-btn');

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

    worksItems.forEach(item => {
        item.addEventListener('click', function() {
            markClicked(this);
            resetUnclicked();
        });
    });

    researchItems.forEach(item => {
        item.addEventListener('click', function() {
            markClicked(this);
            resetUnclicked();
        });
    });

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            markClicked(this);
            resetUnclicked();
        });
    });
});

function toggleWorks() {
    let worksList = document.getElementById("works-list");
    let worksBtn = document.getElementById("works-btn");

    if (worksList.style.display === "block") {
        worksList.style.display = "none";
        worksBtn.style.color = "#0000EE";
    } else {
        worksList.style.display = "block";
        worksBtn.style.color = "#551A8B";
    }
}

function showWork(workId) {
    const content = {
        "works-and-days": "<h2>Works and Days</h2><p>Description of the piece.</p>",
        "claustrum": "<h2>Claustrum</h2><p>Description of the piece.</p>",
        "eliza": "<h2>ELIZA</h2><p>Description of the piece.</p>",
        "body-in-flux": "<h2>Body in Flux</h2><p>Description of the piece.</p>",
        "nepenthe": "<h2>Nepenthe [WIP]</h2><p>Description of the piece.</p>",
        "stasis": "<h2>Stasis</h2><p>Description of the piece.</p>",
        "effigy-1": "<h2>Effigy 1</h2><p>Description of the piece.</p>",
        "grafting": "<h2>Grafting</h2><p>Description of the piece.</p>",
        "adornations": "<h2>Adornations</h2><p>Description of the piece.</p>"
    };

    document.getElementById("work-content").innerHTML = content[workId] || "<p>Select a work to view details.</p>";

    document.querySelectorAll("#works-list a").forEach(link => {
        if (!link.classList.contains('clicked')) {
            link.style.color = "#0000EE";
        }
    });

    let clickedLink = document.querySelector(`[onclick="showWork('${workId}')"]`);
    if (clickedLink) {
        clickedLink.style.color = "#551A8B";
        clickedLink.classList.add('clicked');
    }
}

function showResearch(researchId) {
    const content = {
        "research-1": "<h2>Research Topic 1</h2><p>Description of the research.</p>",
        "research-2": "<h2>Research Topic 2</h2><p>Description of the research.</p>",
        "research-3": "<h2>Research Topic 3</h2><p>Description of the research.</p>"
    };

    document.getElementById("work-content").innerHTML = content[researchId] || "<p>Select a research topic to view details.</p>";

    document.querySelectorAll("#research-list a").forEach(link => {
        if (!link.classList.contains('clicked')) {
            link.style.color = "#0000EE";
        }
    });

    let clickedLink = document.querySelector(`[onclick="showResearch('${researchId}')"]`);
    if (clickedLink) {
        clickedLink.style.color = "#551A8B";
        clickedLink.classList.add('clicked');
    }
}

window.onload = function() {
    document.getElementById("works-btn").style.color = "#0000EE";

    let menuItems = document.querySelectorAll("#menu a");
    menuItems.forEach(item => {
        item.style.color = "#0000EE";
    });

    document.getElementById("header-title").style.color = "#000000";

    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            menuItems.forEach(link => {
                if (!link.classList.contains('clicked')) {
                    link.style.color = "#0000EE";
                }
            });
            this.style.color = "#551A8B";
            this.classList.add('clicked');
        });
    });
};

function showAbout() {
    document.querySelectorAll('.work-content').forEach(div => div.style.display = 'none');
    document.getElementById('about-section').style.display = 'block';
    document.querySelectorAll('#menu a').forEach(link => link.classList.remove('clicked'));
    document.querySelector('#menu a[href="#about-section"]').classList.add('clicked');
}

function showContact() {
    document.querySelectorAll('.work-content').forEach(div => div.style.display = 'none');
    document.getElementById('contact-section').style.display = 'block';
    document.querySelectorAll('#menu a').forEach(link => link.classList.remove('clicked'));
    document.querySelector('#menu a[href="#contact-section"]').classList.add('clicked');
}
