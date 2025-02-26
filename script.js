function toggleWorks() {
    let worksList = document.getElementById("works-list");
    let worksBtn = document.getElementById("works-btn");

    if (worksList.style.display === "block") {
        worksList.style.display = "none";
    } else {
        worksList.style.display = "block";
        worksBtn.style.color = "#551A8B"; // Keeps it purple
    }
}

function showWork(workId) {
    document.querySelectorAll('.work-content').forEach(div => div.style.display = 'none');
    document.getElementById(workId).style.display = 'block';
}

window.onload = function() {
    document.getElementById("works-btn").classList.remove("clicked");
    document.getElementById("header-title").style.color = "#0000EE"; // Reset header color

    // Reset all menu items (CV, About, Contact)
    let menuItems = document.querySelectorAll("#nav a"); 
    menuItems.forEach(item => {
        item.style.color = "#0000EE"; // Reset to blue
    });
};

// Change color when clicked
document.querySelectorAll("#nav a").forEach(item => {
    item.addEventListener("click", function() {
        this.style.color = "#551A8B"; // Turn purple when clicked
    });
});
