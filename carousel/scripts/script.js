document.addEventListener('DOMContentLoaded', () => {
    fetch('data/images.json')
        .then(response => response.json())
        .then(data => {
            const carousel = document.getElementById('carousel');
            data.images.forEach(imageData => {
                const imgElement = document.createElement('img');
                imgElement.src = `assets/images/${imageData.src}`;
                imgElement.alt = imageData.alt;
                carousel.appendChild(imgElement);
            });
        })
        .catch(error => console.error('Error loading images:', error));
});
