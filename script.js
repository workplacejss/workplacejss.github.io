document.querySelector('.dropdown').addEventListener('click', function() {
    document.querySelector('.dropdown-menu').style.display = 'block';
});

function showWork(workId) {
    document.querySelectorAll('.work-content').forEach(div => div.style.display = 'none');
    document.getElementById(workId).style.display = 'block';
}
