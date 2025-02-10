let username = '';

function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function setUsername() {
    const usernameInput = document.getElementById('username-input');
    if (usernameInput.value.trim() !== '') {
        username = usernameInput.value;
        document.getElementById('username-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
    }
}

document.getElementById('username-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        setUsername();
    }
});

function highlightURLs(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const messages = document.getElementById('messages');

    if (chatInput.value.trim() !== '') {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `
            <div class="message-content">
                <b>${username}</b> [${getCurrentTime()}]:
            </div>
            <div>${highlightURLs(chatInput.value)}</div>
        `;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
        chatInput.value = '';
    }
}

document.getElementById('chatForm').addEventListener('submit', function(event) {
    event.preventDefault();
    sendMessage();
});

document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const messages = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `
            <div class="message-content">
                <b>${username}</b> [${getCurrentTime()}]: Sent an image!
            </div>
            <img src="${e.target.result}" style="max-height: 200px; width: auto;">
        `;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        const ipAddressElement = document.getElementById('ip-address');
        if (ipAddressElement) {
            ipAddressElement.textContent = data.ip;
        }
    })
    .catch(error => {
        console.error('Error fetching IP address:', error);
    });
