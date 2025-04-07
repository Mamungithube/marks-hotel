document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();
});

function fetchUsers() {
    fetch('http://127.0.0.1:8000/authontication/list/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayUsers(data);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}

function displayUsers(users) {
    const container = document.getElementById('userContainer');
    container.innerHTML = '';
    
    if (users.length === 0) {
        container.innerHTML = '<div class="col-12"><div class="alert alert-info">No users found</div></div>';
        return;
    }
    
    // Create a list to display users
    const userList = document.createElement('ul');
    userList.className = 'list-group';

    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.className = 'list-group-item';
        userItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-1">${user.username}</h5>
                    <p class="mb-1"><strong>First Name:</strong> ${user.first_name || 'N/A'}</p>
                    <p class="mb-1"><strong>Last Name:</strong> ${user.last_name || 'N/A'}</p>
                    <p class="mb-1"><strong>Email:</strong> ${user.email || 'N/A'}</p>
                </div>
                <small class="text-muted">User ID: ${user.id}</small>
            </div>
        `;
        userList.appendChild(userItem);
    });

    container.appendChild(userList);
}


function searchUsers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    fetch('/api/users/')
        .then(response => response.json())
        .then(data => {
            if (searchTerm) {
                const filteredUsers = data.filter(user => 
                    user.username.toLowerCase().includes(searchTerm) ||
                    (user.first_name && user.first_name.toLowerCase().includes(searchTerm)) ||
                    (user.last_name && user.last_name.toLowerCase().includes(searchTerm)) ||
                    (user.email && user.email.toLowerCase().includes(searchTerm))
                );
                displayUsers(filteredUsers);
            } else {
                displayUsers(data);
            }
        })
        .catch(error => {
            console.error('Error searching users:', error);
        });
}