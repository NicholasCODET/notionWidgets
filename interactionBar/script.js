document.addEventListener('DOMContentLoaded', () => {
    let clapCount = localStorage.getItem('clapCount') ? parseInt(localStorage.getItem('clapCount')) : 0;
    let hasClapped = localStorage.getItem('hasClapped') === 'true';
    let viewCount = localStorage.getItem('viewCount') ? parseInt(localStorage.getItem('viewCount')) : 0;

    const clapButton = document.getElementById('clap-button');
    const clapScore = document.getElementById('clap-score');
    const viewCountDisplay = document.getElementById('view-count');

    // Set initial counts
    clapScore.textContent = clapCount;
    viewCountDisplay.textContent = `Views: ${viewCount}`;

    // Handle clap button click
    clapButton.addEventListener('click', () => {
        if (hasClapped) {
            clapCount--;
            hasClapped = false;
        } else {
            clapCount++;
            hasClapped = true;
        }
        clapScore.textContent = clapCount;
        localStorage.setItem('clapCount', clapCount);
        localStorage.setItem('hasClapped', hasClapped);
    });

    // Update view count
    function updateViewCount() {
        viewCount++;
        viewCountDisplay.textContent = `Views: ${viewCount}`;
        localStorage.setItem('viewCount', viewCount);
    }

    updateViewCount();

    // Theme detection and adjustment
    function applyTheme() {
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDarkScheme) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    // Initial theme application
    applyTheme();

    // Listen for changes in the theme
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', applyTheme);
});
