document.addEventListener('DOMContentLoaded', () => {
    let clapCount = localStorage.getItem('clapCount') ? parseInt(localStorage.getItem('clapCount')) : 0;
    let hasClapped = localStorage.getItem('hasClapped') === 'true';

    const clapButton = document.getElementById('clap-button');
    const clapScore = document.getElementById('clap-score');
    const viewCountDisplay = document.getElementById('view-count');

    // Set initial clap count
    clapScore.textContent = clapCount;

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

    // Update view count from backend
    function updateViewCount() {
        fetch('https://api.mockendpoint.com/view-count')  // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => {
                const viewCount = data.viewCount;
                viewCountDisplay.textContent = `Views: ${viewCount}`;
            })
            .catch(error => console.error('Error fetching view count:', error));
    }

    // Increment view count on backend
    function incrementViewCount() {
        fetch('https://api.mockendpoint.com/increment-view-count', {  // Replace with your actual API endpoint
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            const viewCount = data.viewCount;
            viewCountDisplay.textContent = `Views: ${viewCount}`;
        })
        .catch(error => console.error('Error incrementing view count:', error));
    }

    // Detect Notion theme
    function detectNotionTheme() {
        const notionBody = window.parent.document.body;
        const isDarkMode = notionBody.classList.contains('dark');
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    // Initial theme detection
    detectNotionTheme();

    // Listen for changes in the Notion theme
    const observer = new MutationObserver(detectNotionTheme);
    observer.observe(window.parent.document.body, { attributes: true, attributeFilter: ['class'] });

    // Initial view count update and increment
    updateViewCount();
    incrementViewCount();
});
