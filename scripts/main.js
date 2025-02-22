function sanitizeHTML(html) {
    var temp = document.createElement('div');
    temp.textContent = html;
    return temp.innerHTML;
}

function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

let rawUsername = '';
let username = ''

function setUsername() {
    const usernameInput = document.getElementById('username-input');
    if (usernameInput.value.trim() !== '') {
        rawUsername = usernameInput.value;
        username = sanitizeHTML(rawUsername);
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
        const sanitizedMessage = sanitizeHTML(chatInput.value);
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `
            <div class="message-content">
                <b>${username}</b> [${getCurrentTime()}]: ${highlightURLs(sanitizedMessage)}
            </div>
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

    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))