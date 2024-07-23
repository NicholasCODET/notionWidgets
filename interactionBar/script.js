document.addEventListener('DOMContentLoaded', () => {
    let likeCount = 0;
    let hasLiked = false;
    let viewCount = 0;

    const likeButton = document.getElementById('like-button');
    const likeScore = document.getElementById('like-score');
    const bookmarkButton = document.getElementById('bookmark-button');
    const shareButton = document.getElementById('share-button');
    const viewCountDisplay = document.getElementById('view-count');

    // Handle clap button click
    likeButton.addEventListener('click', () => {
        if (!hasLiked) {
            likeCount++;
            likeScore.textContent = likeCount;
            hasLiked = true;
        }
    });

    // Handle bookmark button click
    bookmarkButton.addEventListener('click', () => {
        const title = document.title;
        const url = window.location.href;
        try {
            if (window.sidebar && window.sidebar.addPanel) { // Firefox
                window.sidebar.addPanel(title, url, '');
            } else if (window.external && ('AddFavorite' in window.external)) { // IE
                window.external.AddFavorite(url, title);
            } else if (window.opera && window.print) { // Opera
                bookmarkButton.setAttribute('title', title);
                bookmarkButton.setAttribute('href', url);
                bookmarkButton.setAttribute('rel', 'sidebar');
                bookmarkButton.click();
            } else { // Other browsers (mainly Chrome)
                alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D to bookmark this page.');
            }
        } catch (e) {
            alert('Your browser does not support this bookmarking method.');
        }
    });

    // Handle share button click
    shareButton.addEventListener('click', () => {
        const shareURL = window.location.href;
        navigator.clipboard.writeText(shareURL).then(() => {
            alert('URL copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy URL: ', err);
        });
    });

    // Update view count
    function updateViewCount() {
        viewCount++;
        viewCountDisplay.textContent = `Views: ${viewCount}`;
    }

    updateViewCount();
});
