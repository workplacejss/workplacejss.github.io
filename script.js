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
    let researchList = document.getElementById("research-list"); // Reference to the research list

    // Hide the research list if it's open
    if (researchList.style.display === "block") {
        researchList.style.display = "none";
        document.getElementById("research-btn").style.color = "#0000EE"; // Reset research button to blue
    }

    // Toggle the works list
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

    // Hide all other content (works and research sections)
    document.querySelectorAll('.work-content, .research-content').forEach(div => div.style.display = 'none');

    // Explicitly hide the research box
    const researchBox = document.getElementById("research-box");
    if (researchBox) {
        researchBox.style.display = "none";
        researchBox.style.zIndex = "1"; // Push research box to the back
    }

    // Populate the work content box with the selected work content
    const workBox = document.getElementById("work-content");
    workBox.innerHTML = content[workId] || "<p>Select a work to view details.</p>";
    workBox.style.display = "block"; // Show the box
    workBox.style.zIndex = "10"; // Bring work box to the front

    // Reset colors for works list links
    document.querySelectorAll("#works-list a").forEach(link => {
        link.style.color = "#0000EE"; // Reset to blue
    });

    // Highlight the clicked link
    const clickedLink = document.querySelector(`[onclick="showWork('${workId}')"]`);
    if (clickedLink) {
        clickedLink.style.color = "#551A8B"; // Change to purple
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

function toggleResearch() {
    let researchList = document.getElementById("research-list");
    let researchBtn = document.getElementById("research-btn");
    let worksList = document.getElementById("works-list"); // Reference to the works list

    // Hide the works list if it's open
    if (worksList.style.display === "block") {
        worksList.style.display = "none";
        document.getElementById("works-btn").style.color = "#0000EE"; // Reset works button to blue
    }

    // Toggle the research list
    if (researchList.style.display === "block") {
        researchList.style.display = "none";
        researchBtn.style.color = "#0000EE"; // Reset to blue when closed
    } else {
        researchList.style.display = "block";
        researchBtn.style.color = "#551A8B"; // Change to purple when open
    }
}

function showResearch(researchId) {
    const content = {
        "research-1": "<h2>Research Topic 1</h2><p>Detailed content for Research Topic 1.</p>",
        "research-2": "<h2>Research Topic 2</h2><p>Detailed content for Research Topic 2.</p>",
        "research-3": "<h2>Research Topic 3</h2><p>Detailed content for Research Topic 3.</p>"
    };

    // Hide all other content (works and research sections)
    document.querySelectorAll('.work-content, .research-content').forEach(div => div.style.display = 'none');

    // Explicitly hide the work box
    const workBox = document.getElementById("work-content");
    if (workBox) {
        workBox.style.display = "none";
        workBox.style.zIndex = "1"; // Push work box to the back
    }

    // Populate the research box with the selected research content
    const researchBox = document.getElementById("research-box");
    researchBox.innerHTML = content[researchId] || "<p>Select a research topic to view details.</p>";
    researchBox.style.display = "block"; // Show the box
    researchBox.style.zIndex = "10"; // Bring research box to the front

    // Reset colors for research list links
    document.querySelectorAll("#research-list a").forEach(link => {
        link.style.color = "#0000EE"; // Reset to blue
    });

    // Highlight the clicked link
    const clickedLink = document.querySelector(`[onclick="showResearch('${researchId}')"]`);
    if (clickedLink) {
        clickedLink.style.color = "#551A8B"; // Change to purple
    }
}
