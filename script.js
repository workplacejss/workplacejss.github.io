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
        "nepenthe": "<h2>Nepenthe</h2><p>Description of the piece.</p>",
        "stasis": "<h2>Stasis</h2><p>Description of the piece.</p>",
        "effigy-1": "<h2>Effigy 1</h2><p>Description of the piece.</p>",
        "grafting": "<h2>Grafting</h2><p>Description of the piece.</p>",
        "adornations": "<h2>Adornations</h2><p>Description of the piece.</p>"
    };

    document.getElementById("work-content").innerHTML = content[workId] || "<p>Select a work to view details.</p>";

    // Reset all works to default blue
    document.querySelectorAll("#works-list a").forEach(link => {
        link.style.color = "#0000EE"; // Reset to blue
    });

    // Set clicked work to purple
    event.target.style.color = "#551A8B";
}

window.onload = function() {
    document.getElementById("works-btn").style.color = "#0000EE"; // Reset "WORKS" to blue

    // Reset all menu items (CV, About, Contact)
    let menuItems = document.querySelectorAll("#menu a"); 
    menuItems.forEach(item => {
        item.style.color = "#0000EE"; // Reset to blue
    });

    // Add event listeners to menu items
    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            menuItems.forEach(link => link.style.color = "#0000EE"); // Reset all to blue
            this.style.color = "#551A8B"; // Make clicked one purple
        });
    });
};
