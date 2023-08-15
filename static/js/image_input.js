document.getElementById('image-input').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const previewImage = document.getElementById('preview-image');
    const previewContainer = document.getElementById('preview-container');

    if (file) {
        const reader = new FileReader();

        reader.onload = function () {
            previewImage.style.backgroundImage = `url(${reader.result})`;
            previewImage.classList.remove('empty-preview');
        };

        reader.readAsDataURL(file);
    } else {
        previewImage.style.backgroundImage = '';
        previewImage.classList.add('empty-preview');
    }
});

function deleteImage() {
    const previewImage = document.getElementById('preview-image');
    const imageInput = document.getElementById('image-input');
    imageInput.value = ''; 
    previewImage.style.backgroundImage = '';
    previewImage.classList.add('empty-preview');
}