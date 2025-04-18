document.addEventListener('DOMContentLoaded', function() {
    const worksItems = document.querySelectorAll('#works-list a');
    const menuItems = document.querySelectorAll('#menu a, #works-btn');

    function markClicked(item) {
        item.style.color = '#551A8B'; // Make clicked item purple
        item.classList.add('clicked');
    }

    function resetUnclicked() {
        menuItems.forEach(link => {
            if (!link.classList.contains('clicked')) {
                link.style.color = '#0000EE'; // Reset unclicked items to blue
            }
        });
    }

    // Handle Works menu items
    worksItems.forEach(item => {
        item.addEventListener('click', function() {
            markClicked(this);
        });
    });

    // Handle About & Contact menu items
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            markClicked(this);
            resetUnclicked(); // Reset only unclicked items
        });
    });
});

function toggleWorks() {
    let worksList = document.getElementById("works-list");
    let worksBtn = document.getElementById("works-btn");

    if (worksList.style.display === "block") {
        worksList.style.display = "none";
        worksBtn.style.color = "#0000EE"; // Reset to blue when closed
    } else {
        worksList.style.display = "block";
        worksBtn.style.color = "#551A8B"; // Keep purple when open
    }
}

function showWork(workId) {
    let content = {
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

    // Keep all previously clicked works purple
    document.querySelectorAll("#works-list a").forEach(link => {
        if (link.dataset.clicked !== "true") {
            link.style.color = "#0000EE"; // Reset only unclicked ones
        }
    });

    // Set clicked work to purple and mark it as clicked
    let clickedLink = document.querySelector(`[onclick="showWork('${workId}')"]`);
    if (clickedLink) {
        clickedLink.style.color = "#551A8B"; // Stay purple
        clickedLink.dataset.clicked = "true"; // Mark as clicked
    }
}

window.onload = function() {
    document.getElementById("works-btn").style.color = "#0000EE"; // Reset "WORKS" to blue

    // Reset all menu items (CV, About, Contact)
    let menuItems = document.querySelectorAll("#menu a"); 
    menuItems.forEach(item => {
        item.style.color = "#0000EE"; // Reset to blue
    });

    // Set header color to black
    document.getElementById("header-title").style.color = "#000000";

    // Add event listeners to menu items
    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            menuItems.forEach(link => {
                if (!link.classList.contains('clicked')) {
                    link.style.color = "#0000EE"; // Reset unclicked items to blue
                }
            });
            this.style.color = "#551A8B"; // Make clicked one purple
            this.classList.add('clicked');
        });
    });
};

function showWork(workId) {
    document.querySelectorAll('.work-content').forEach(div => div.style.display = 'none');
    document.getElementById(workId).style.display = 'block';
}

function showAbout() {
    document.querySelectorAll('.work-content').forEach(div => div.style.display = 'none');
    document.getElementById('about-section').style.display = 'block';
}

function showContact() {
    document.querySelectorAll('.work-content').forEach(div => div.style.display = 'none');
    document.getElementById('contact-section').style.display = 'block';
}
