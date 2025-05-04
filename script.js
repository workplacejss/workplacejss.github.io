<script>
document.addEventListener('DOMContentLoaded', function() {
    const worksItems = document.querySelectorAll('#works-list a');
    const researchItems = document.querySelectorAll('#research-list a');
    const menuItems = document.querySelectorAll('#menu a, #works-btn, #research-btn');

    function markClicked(item) {
        item.style.color = '#551A8B'; // Purple for clicked
        item.classList.add('clicked');
    }

    function resetUnclicked(scope = menuItems) {
        scope.forEach(link => {
            if (!link.classList.contains('clicked')) {
                link.style.color = '#0000EE'; // Blue for unclicked
            }
        });
    }

    // Works items
    worksItems.forEach(item => {
        item.addEventListener('click', function () {
            const workId = this.getAttribute('onclick')?.match(/'(.*?)'/)?.[1] || this.dataset.workId;
            showWork(workId);
            markClicked(this);
            resetUnclicked(worksItems);
        });
    });

    // Research items
    researchItems.forEach(item => {
        item.addEventListener('click', function () {
            const researchId = this.dataset.researchId;
            showWork(researchId);
            markClicked(this);
            resetUnclicked(researchItems);
        });
    });

    // Top-level menu items (CV, About, Contact, Works, Research)
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            markClicked(this);
            resetUnclicked();
        });
    });
});

function toggleWorks() {
    const worksList = document.getElementById("works-list");
    const worksBtn = document.getElementById("works-btn");

    if (worksList.style.display === "block") {
        worksList.style.display = "none";
        worksBtn.style.color = "#0000EE";
    } else {
        worksList.style.display = "block";
        worksBtn.style.color = "#551A8B";

        // Optional: close research
        document.getElementById("research-list").style.display = "none";
        document.getElementById("research-btn").style.color = "#0000EE";
    }
}

function toggleResearch() {
    const researchList = document.getElementById("research-list");
    const researchBtn = document.getElementById("research-btn");

    if (researchList.style.display === "block") {
        researchList.style.display = "none";
        researchBtn.style.color = "#0000EE";
    } else {
        researchList.style.display = "block";
        researchBtn.style.color = "#551A8B";

        // Optional: close works
        document.getElementById("works-list").style.display = "none";
        document.getElementById("works-btn").style.color = "#0000EE";
    }
}

function showWork(workId) {
    document.querySelectorAll('.work-content').forEach(div => div.style.display = 'none');
    const contentDiv = document.getElementById(workId);
    if (contentDiv) {
        contentDiv.style.display = 'block';
    }
}

function showAbout() {
    document.querySelectorAll('.work-content').forEach(div => div.style.display = 'none');
    document.getElementById('about-section').style.display = 'block';
}

function showContact() {
    document.querySelectorAll('.work-content').forEach(div => div.style.display = 'none');
    document.getElementById('contact-section').style.display = 'block';
}

window.onload = function() {
    document.getElementById("works-btn").style.color = "#0000EE";
    document.getElementById("research-btn").style.color = "#0000EE";

    let menuItems = document.querySelectorAll("#menu a");
    menuItems.forEach(item => {
        item.style.color = "#0000EE";
        item.addEventListener("click", function () {
            menuItems.forEach(link => {
                if (!link.classList.contains('clicked')) {
                    link.style.color = "#0000EE";
                }
            });
            this.style.color = "#551A8B";
            this.classList.add('clicked');
        });
    });

    document.getElementById("header-title").style.color = "#000000";
};
</script>
