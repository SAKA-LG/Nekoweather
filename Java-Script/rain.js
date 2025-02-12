const rainContainer = document.getElementById('rain-container');

        function createRainDrop() {
            const rainDrop = document.createElement('div');
            rainDrop.classList.add('rain');
            rainDrop.style.left = Math.random() * window.innerWidth + 'px';
            rainDrop.style.animationDuration = Math.random() * 1 + 1 + 's';
            rainDrop.style.opacity = Math.random();
            rainContainer.appendChild(rainDrop);

            setTimeout(() => {
                rainDrop.remove();
            }, 8000);
        }

        setInterval(createRainDrop, 1);

        