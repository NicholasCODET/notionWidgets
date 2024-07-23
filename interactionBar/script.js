document.addEventListener('DOMContentLoaded', () => {
    let clapCount = 0;
    let hasClapped = false;
    let viewCount = 0;

    const clapButton = document.getElementById('clap-button');
    const clapScore = document.getElementById('clap-score');
    const viewCountDisplay = document.getElementById('view-count');

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
    });

    // Update view count
    function updateViewCount() {
        viewCount++;
        viewCountDisplay.textContent = `Views: ${viewCount}`;
    }

    updateViewCount();
});
