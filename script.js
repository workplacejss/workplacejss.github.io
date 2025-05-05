// Initialize after DOM is ready
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

    worksItems.forEach(item => {
        item.addEventListener('click', function() {
            markClicked(this);
        });
    });

    researchItems.forEach(item => {
        item.addEventListener('click', function() {
            markClicked(this);
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

    let isOpen = worksList.style.display === "block";
    worksList.style.display = isOpen ? "none" : "block";
    worksBtn.style.color = isOpen ? "#0000EE" : "#551A8B";
}

function toggleResearch() {
    let researchList = document.getElementById("research-list");
    let researchBtn = document.getElementById("research-btn");

    let isOpen = researchList.style.display === "block";
    researchList.style.display = isOpen ? "none" : "block";
    researchBtn.style.color = isOpen ? "#0000EE" : "#551A8B";
}

function showWork(workId) {
    const workContent = document.getElementById("work-content");
    const researchContent = document.getElementById("research-content");

    // Hide all contents first
    document.querySelectorAll(".work-content").forEach(el => el.style.display = "none");
    document.querySelectorAll(".research-content").forEach(el => el.style.display = "none");

    // Decide where to show content
    if (workId.startsWith("research")) {
        researchContent.style.display = "block";
        workContent.style.display = "none";
        document.getElementById(workId).style.display = "block";
    } else {
        workContent.style.display = "block";
        researchContent.style.display = "none";
        document.getElementById(workId).style.display = "block";
    }
} 

function showAbout() {
    const sections = document.querySelectorAll('.work-content');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById('about-section').style.display = 'block';
}

function showContact() {
    const sections = document.querySelectorAll('.work-content');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById('contact-section').style.display = 'block';
}

window.onload = function() {
    document.getElementById("works-btn").style.color = "#0000EE";
    document.getElementById("research-btn").style.color = "#0000EE";

    let menuItems = document.querySelectorAll("#menu a"); 
    menuItems.forEach(item => {
        item.style.color = "#0000EE";
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
