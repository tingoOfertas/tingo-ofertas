const showNotification = (message) => {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
};

const toggleFullscreen = (src) => {
    const fullscreen = document.getElementById('fullscreen-image');
    document.getElementById('fullscreen-img').src = src;
    fullscreen.classList.toggle('active');
};

const toggleModal = () => {
    document.getElementById('modal').classList.toggle('active');
};
