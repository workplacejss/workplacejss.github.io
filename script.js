function toggleWorks() {
    let worksList = document.getElementById("works-list");
    let worksBtn = document.getElementById("works-btn");
    
    if (worksList.style.display === "block") {
        worksList.style.display = "none";
        worksBtn.classList.remove("clicked");
    } else {
        worksList.style.display = "block";
        worksBtn.classList.add("clicked");
    }
}

function showWork(workId) {
    document.querySelectorAll('.work-content').forEach(div => div.style.display = 'none');
    document.getElementById(workId).style.display = 'block';
}

