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
}); // Missing closing brace added here

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const messages = document.getElementById('messages');

    if (chatInput.value.trim() !== '') {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `<b>${username}</b> [${getCurrentTime()}]: ${chatInput.value}`;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;

        // Clear the input field after sending
        chatInput.value = '';
    }
}

// Event listener to detect "Enter" key press
document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        // Display the IP address in the HTML
        const ipAddressElement = document.getElementById('ip-address');
        if (ipAddressElement) {
            ipAddressElement.textContent = data.ip;

            // Call the ifAddress function with the fetched IP address
            ifAddress(data.ip);
        }
    })
    .catch(error => {
        console.error('Error fetching IP address:', error);
    });