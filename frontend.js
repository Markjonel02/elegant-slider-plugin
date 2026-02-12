
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.esp-slider-root[data-layout="flex"]');

    sliders.forEach(slider => {
        const wrapper = slider.querySelector('.esp-slider-wrapper');
        const slides = slider.querySelectorAll('.esp-slide');
        const dotsContainer = slider.querySelector('.esp-dots-container');
        let current = 0;

        // Init Dots
        if (dotsContainer) {
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.classList.add('esp-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goto(i));
                dotsContainer.appendChild(dot);
            });
        }

        function update() {
            const animation = slider.dataset.animation;
            
            if (animation === 'slide') {
                wrapper.style.transform = `translateX(-${current * 100}%)`;
            }

            slides.forEach((s, i) => {
                s.classList.toggle('active', i === current);
            });

            if (dotsContainer) {
                dotsContainer.querySelectorAll('.esp-dot').forEach((d, i) => {
                    d.classList.toggle('active', i === current);
                });
            }
        }

        function goto(index) {
            current = (index + slides.length) % slides.length;
            update();
        }

        // Nav Click
        slider.querySelector('.prev')?.addEventListener('click', () => goto(current - 1));
        slider.querySelector('.next')?.addEventListener('click', () => goto(current + 1));

        // Autoplay
        if (slider.dataset.autoplay === 'true') {
            setInterval(() => goto(current + 1), 5000);
        }
    });
});
