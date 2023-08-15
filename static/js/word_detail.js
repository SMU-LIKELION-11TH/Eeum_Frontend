function clearPlaceholder() {
    const searchInput = document.getElementById('searchInput');
    searchInput.placeholder = '';
}

let likeCount = 0;
let isLiked = false;
let isBookmarked = false;

function toggleHeart() {
    isLiked = !isLiked;

    const heartIcon = document.getElementById('heart_icon');
    const likeCountElement = document.getElementById('like_count');

    if (isLiked) {
        heartIcon.classList.add('filled-heart');
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('fa-solid');
        likeCount++;
    } else {
        heartIcon.classList.remove('filled-heart');
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
        likeCount--;
    }

    likeCountElement.innerText = likeCount;

}

function toggleBookmark() {
    isBookmarked = !isBookmarked;

    const bookmarkIcon = document.getElementById('bookmark_icon');

    if(isBookmarked){
        bookmarkIcon.classList.add('fa-solid');
        bookmarkIcon.classList.remove('fa-regular');
    } else{
        bookmarkIcon.classList.remove('fa-solid');
        bookmarkIcon.classList.add('fa-regular');
    }
}