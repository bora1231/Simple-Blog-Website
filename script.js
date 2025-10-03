const apiUrl = 'https://jsonplaceholder.typicode.com/users';

const dataContainer = document.getElementById('dataContainer');
const reloadButton = document.getElementById('reloadDataButton');

function displayUsers(users) {
    dataContainer.innerHTML = ''; 
    
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';

        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
        `;
        dataContainer.appendChild(userCard);
    });
}

function displayError(message) {
    dataContainer.innerHTML = `<p class="error-message">Error: ${message}. Check your network connection.</p>`;
}

async function fetchData() {
    dataContainer.innerHTML = '<p class="initial-message">Loading user data...</p>';
    
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const users = await response.json();
        
        displayUsers(users);

    } catch (error) {
        displayError(error.message);
    }
}

reloadButton.addEventListener('click', fetchData);

fetchData();