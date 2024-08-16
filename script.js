const slider = document.getElementById('slider');
const handle = slider.querySelector('span');
const submitBtn = document.getElementById('submitBtn');

let isDragging = false;
let startX, currentX;

handle.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.pageX - slider.offsetLeft;
});

document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;

    currentX = e.pageX - slider.offsetLeft;

    if (currentX < 0) currentX = 0;
    if (currentX > slider.offsetWidth - handle.offsetWidth) currentX = slider.offsetWidth - handle.offsetWidth;

    handle.style.left = currentX + 'px';

    if (currentX >= slider.offsetWidth - handle.offsetWidth) {
        slider.classList.add('done');
        submitBtn.disabled = false;
        submitBtn.classList.add('enabled');
        isDragging = false;
    }
});

document.addEventListener('mouseup', function() {
    if (isDragging && currentX < slider.offsetWidth - handle.offsetWidth) {
        handle.style.left = '0px';
    }
    isDragging = false;
});

submitBtn.addEventListener('click', function() {
    if (!submitBtn.disabled) {
        window.location.href = 'target.html';
    }
});
// Session Timeout (3 minutes)
let sessionTimeout = 3 * 60 * 1000; // 3 minutes in milliseconds
let sessionTimer = setTimeout(() => {
    alert('Session expired. Please try again.');
    window.location.reload();
}, sessionTimeout);

// Reset session timeout on user activity
document.onmousemove = resetTimer;
document.onkeypress = resetTimer;

function resetTimer() {
    clearTimeout(sessionTimer);
    sessionTimer = setTimeout(() => {
        alert('Session expired. Please try again.');
        window.location.reload();
    }, sessionTimeout);
}

