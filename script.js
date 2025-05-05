// Function to toggle the "Works" section
function toggleWorks() {
    let worksList = document.getElementById("works-list");
    let worksBtn = document.getElementById("works-btn");

    let isOpen = worksList.style.display === "block";
    worksList.style.display = isOpen ? "none" : "block";
    worksBtn.style.color = isOpen ? "#0000EE" : "#551A8B";

    // Ensure "Research" is closed
    document.getElementById("research-list").style.display = "none";
}

// Function to toggle the "Research" section
function toggleResearch() {
    let researchList = document.getElementById("research-list");
    let researchBtn = document.getElementById("research-btn");

    let isOpen = researchList.style.display === "block";
    researchList.style.display = isOpen ? "none" : "block";
    researchBtn.style.color = isOpen ? "#0000EE" : "#551A8B";

    // Ensure "Works" is closed
    document.getElementById("works-list").style.display = "none";
}

// Function to show a specific "Work" or "Research" item
function showWork(workId) {
    // Hide all content sections
    document.querySelectorAll(".work-content").forEach(el => el.style.display = "none");
    document.querySelectorAll(".research-content").forEach(el => el.style.display = "none");

    // Show the specific section
    const targetSection = document.getElementById(workId);
    if (targetSection) {
        targetSection.style.display = "block";
    }

    // Ensure "ABOUT" and "CONTACT" are hidden
    document.getElementById("about-section").style.display = "none";
    document.getElementById("contact-section").style.display = "none";
}

// Function to show the "ABOUT" section
function showAbout() {
    // Hide all other content sections
    document.querySelectorAll(".work-content, .research-content").forEach(el => el.style.display = "none");

    // Hide the "Works" and "Research" lists
    document.getElementById("works-list").style.display = "none";
    document.getElementById("research-list").style.display = "none";

    // Show the "ABOUT" section
    document.getElementById("about-section").style.display = "block";
}

// Function to show the "CONTACT" section
function showContact() {
    // Hide all other content sections
    document.querySelectorAll(".work-content, .research-content").forEach(el => el.style.display = "none");

    // Hide the "Works" and "Research" lists
    document.getElementById("works-list").style.display = "none";
    document.getElementById("research-list").style.display = "none";

    // Show the "CONTACT" section
    document.getElementById("contact-section").style.display = "block";
}

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

// Set default styles on window load
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
