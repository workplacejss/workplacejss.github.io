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

