document.querySelectorAll('.footer-text').forEach(button => {
    button.addEventListener('mouseover', () => {
        const star = button.querySelector('.footer-star');
        star.style.transform = 'translateY(-10px) rotate(360deg)';
    });

    button.addEventListener('mouseout', () => {
        const star = button.querySelector('.footer-star');
        star.style.transform = 'translateY(0) rotate(0deg)';
    });
});