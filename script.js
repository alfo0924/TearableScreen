document.addEventListener('DOMContentLoaded', () => {
    const tearable = document.getElementById('tearable');
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationId = null;

    // 使用 transform 而非改變 left/top 來提升性能
    function updatePosition() {
        tearable.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }

    // 使用 requestAnimationFrame 來平滑動畫
    function animate() {
        updatePosition();
        if (isDragging) {
            animationId = requestAnimationFrame(animate);
        }
    }

    // 滑鼠按下事件
    tearable.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;

        // 開始動畫循環
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        animate();
    });

    // 滑鼠移動事件
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        e.preventDefault();
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
    });

    // 滑鼠放開事件
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        }
    });

    // 觸控支援
    tearable.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        isDragging = true;
        startX = touch.clientX - currentX;
        startY = touch.clientY - currentY;

        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        animate();
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        e.preventDefault();
        const touch = e.touches[0];
        currentX = touch.clientX - startX;
        currentY = touch.clientY - startY;
    });

    document.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        }
    });

    // 防止圖片被拖曳
    tearable.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});
