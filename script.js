document.addEventListener('DOMContentLoaded', () => {
    const tearable = document.getElementById('tearable');
    let tearing = false;
    let lastX = 0;
    let lastY = 0;

    tearable.addEventListener('mousedown', (e) => {
        tearing = true;
        lastX = e.offsetX;
        lastY = e.offsetY;
        tearable.style.cursor = 'grabbing';
    });

    tearable.addEventListener('mousemove', (e) => {
        if (!tearing) return;

        const x = e.offsetX;
        const y = e.offsetY;

        // You would implement the tearing effect here.
        // This example just moves the image.
        const deltaX = x - lastX;
        const deltaY = y - lastY;

        tearable.style.left = (parseInt(tearable.style.left || 0) + deltaX) + 'px';
        tearable.style.top = (parseInt(tearable.style.top || 0) + deltaY) + 'px';

        lastX = x;
        lastY = y;
    });

    tearable.addEventListener('mouseup', () => {
        tearing = false;
        tearable.style.cursor = 'grab';
    });

    tearable.addEventListener('mouseleave', () => {
        tearing = false;
        tearable.style.cursor = 'grab';
    });
});
