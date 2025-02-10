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
            <div>${chatInput.value}</div>
        `;
        
        // Insert the new message at the end of the message container
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;

        // Clear the input field after sending
        chatInput.value = '';
    }
}

document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
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
        
        // Insert the new message at the end of the message container
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
            ifAddress(data.ip);
        }
    })
    .catch(error => {
        console.error('Error fetching IP address:', error);
    });
