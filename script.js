const slider = document.getElementById('slider');
const handle = slider.querySelector('span');
const submitBtn = document.getElementById('submitBtn');

let isDragging = false;
let startX, currentX;

// Function to update the position of the handle
function updateHandlePosition(pageX) {
    currentX = pageX - slider.offsetLeft;

    if (currentX < 0) currentX = 0;
    if (currentX > slider.offsetWidth - handle.offsetWidth) currentX = slider.offsetWidth - handle.offsetWidth;

    handle.style.left = currentX + 'px';

    // Check if slider is unlocked
    if (currentX >= slider.offsetWidth - handle.offsetWidth) {
        slider.classList.add('done');
        submitBtn.disabled = false;
        submitBtn.classList.add('enabled');
        isDragging = false;
    }
}

// Mouse events
handle.addEventListener('mousedown', function (e) {
    isDragging = true;
    startX = e.pageX - slider.offsetLeft;
});

document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    updateHandlePosition(e.pageX);
});

document.addEventListener('mouseup', function () {
    if (isDragging && currentX < slider.offsetWidth - handle.offsetWidth) {
        handle.style.left = '0px';
    }
    isDragging = false;
});

// Touch events for mobile
handle.addEventListener('touchstart', function (e) {
    isDragging = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
});

document.addEventListener('touchmove', function (e) {
    if (!isDragging) return;
    updateHandlePosition(e.touches[0].pageX);
});

document.addEventListener('touchend', function () {
    if (isDragging && currentX < slider.offsetWidth - handle.offsetWidth) {
        handle.style.left = '0px';
    }
    isDragging = false;
});

// Honeypot CAPTCHA check
document.getElementById("extraField").addEventListener("input", function() {
    if (this.value !== "") {
        submitBtn.disabled = true;
        submitBtn.classList.remove('enabled');
    } else {
        if (slider.classList.contains('done')) {
            submitBtn.disabled = false;
            submitBtn.classList.add('enabled');
        }
    }
});

// Submit button click event
submitBtn.addEventListener('click', function () {
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
