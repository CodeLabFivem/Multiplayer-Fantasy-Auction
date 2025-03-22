// Store registered teams and their data
const teams = {};
let adminAccessCode = "admin123"; // Default admin access code

// Store players and auction data
const players = [
    {
        name: "Virat Kohli",
        category: "batter",
        basePrice: 1500000,
        description: "Right-handed top-order batter",
        status: "waiting" // waiting, active, sold, unsold
    },
    {
        name: "Jasprit Bumrah",
        category: "pitcher",
        basePrice: 1200000,
        description: "Right-arm fast bowler",
        status: "waiting"
    },
    {
        name: "Ben Stokes",
        category: "allrounder",
        basePrice: 1300000,
        description: "Left-handed batter and right-arm fast bowler",
        status: "waiting"
    },
    {
        name: "MS Dhoni",
        category: "batter",
        basePrice: 1100000,
        description: "Right-handed wicket-keeper batter",
        status: "waiting"
    }
];

let auctionState = {
    status: "inactive", // inactive, active, paused
    currentPlayer: null,
    currentBid: 0,
    currentBidder: null,
    timeLeft: 30, // seconds
    timer: null
};

// Update "All Teams" list dynamically
function updateTeamsList() {
    const teamList = document.getElementById('team-list');
    teamList.innerHTML = ''; // Clear existing list

    Object.keys(teams).forEach((name) => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        if (auctionState.currentBidder === name) {
            teamCard.className += ' current';
        }
        teamCard.innerHTML = `
            <div class="team-header">
                <div class="team-name">${name}</div>
                <div class="team-purse">$${teams[name].purse.toLocaleString()}</div>
            </div>
            <div class="team-status">Players: ${teams[name].players.length}</div>
            ${teams[name].isAdmin ? '<div class="team-status">(Admin)</div>' : ''}
        `;
        teamList.appendChild(teamCard);
    });

    if (!Object.keys(teams).length) {
        teamList.innerHTML = '<div class="empty-message">No teams have joined yet</div>';
    }
}

// Update the current player display
function updateCurrentPlayerDisplay() {
    if (!auctionState.currentPlayer) return;
    
    const player = players.find(p => p.name === auctionState.currentPlayer);
    if (!player) return;
    
    document.querySelector('.player-name').textContent = player.name;
    document.querySelector('.player-price').textContent = `Base: $${player.basePrice.toLocaleString()}`;
    
    const badgeClass = `badge-${player.category}`;
    document.querySelector('.player-info').innerHTML = `
        <span class="badge ${badgeClass}">${capitalizeFirstLetter(player.category)}</span>
        <p>${player.description}</p>
    `;
    
    // Update current bid info
    document.getElementById('highest-bidder').textContent = auctionState.currentBidder || "Waiting for bids";
    document.getElementById('highest-bid').textContent = `$${auctionState.currentBid.toLocaleString()}`;
    
    // Set minimum bid amount
    const bidInput = document.getElementById('bid-amount');
    const minBid = auctionState.currentBid + 100000; // 100k increment
    bidInput.value = minBid;
    bidInput.min = minBid;
}

// Update the next players queue
function updateNextPlayersQueue() {
    const nextPlayersTable = document.querySelector('.next-up table tbody');
    nextPlayersTable.innerHTML = '';
    
    const waitingPlayers = players.filter(player => player.status === "waiting");
    
    if (waitingPlayers.length === 0) {
        nextPlayersTable.innerHTML = '<tr><td colspan="3" class="empty-message">No more players in queue</td></tr>';
        return;
    }
    
    waitingPlayers.slice(0, 3).forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.name}</td>
            <td><span class="badge badge-${player.category}">${capitalizeFirstLetter(player.category)}</span></td>
            <td>$${player.basePrice.toLocaleString()}</td>
        `;
        nextPlayersTable.appendChild(row);
    });
}

// Update the admin player list
function updateAdminPlayerList() {
    const playerListTable = document.querySelector('.player-list table tbody');
    playerListTable.innerHTML = '';
    
    players.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.name}</td>
            <td><span class="badge badge-${player.category}">${capitalizeFirstLetter(player.category)}</span></td>
            <td>$${player.basePrice.toLocaleString()}</td>
            <td>${capitalizeFirstLetter(player.status)}</td>
            <td>
                <button class="btn edit-player-btn" data-index="${index}">Edit</button>
                <button class="btn btn-danger remove-player-btn" data-index="${index}">Remove</button>
            </td>
        `;
        playerListTable.appendChild(row);
    });
    
    // Add event listeners to edit and remove buttons
    document.querySelectorAll('.edit-player-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            editPlayer(index);
        });
    });
    
    document.querySelectorAll('.remove-player-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            removePlayer(index);
        });
    });
}

// Edit player function
function editPlayer(index) {
    const player = players[index];
    if (!player) return;
    
    const newName = prompt("Player name:", player.name);
    if (!newName) return;
    
    const newCategory = prompt("Player category (pitcher, batter, allrounder):", player.category);
    if (!newCategory) return;
    
    const newPrice = parseInt(prompt("Base price:", player.basePrice));
    if (isNaN(newPrice)) return;
    
    const newDescription = prompt("Player description:", player.description);
    if (!newDescription) return;
    
    players[index] = {
        ...player,
        name: newName,
        category: newCategory.toLowerCase(),
        basePrice: newPrice,
        description: newDescription
    };
    
    updateAdminPlayerList();
    updateNextPlayersQueue();
    if (auctionState.currentPlayer === player.name) {
        auctionState.currentPlayer = newName;
        updateCurrentPlayerDisplay();
    }
}

// Remove player function
function removePlayer(index) {
    if (!confirm("Are you sure you want to remove this player?")) return;
    
    const player = players[index];
    if (auctionState.currentPlayer === player.name) {
        alert("Cannot remove player currently in auction!");
        return;
    }
    
    players.splice(index, 1);
    updateAdminPlayerList();
    updateNextPlayersQueue();
}

// Start auction timer
function startTimer() {
    clearInterval(auctionState.timer);
    
    const timerElement = document.querySelector('.auction-timer');
    auctionState.timer = setInterval(() => {
        auctionState.timeLeft--;
        
        // Format time as MM:SS
        const minutes = Math.floor(auctionState.timeLeft / 60);
        const seconds = auctionState.timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Handle timer expiry
        if (auctionState.timeLeft <= 0) {
            clearInterval(auctionState.timer);
            
            if (auctionState.currentBidder) {
                // Player is sold
                markPlayerAsSold();
            } else {
                // No bids, player unsold
                markPlayerAsUnsold();
            }
        }
    }, 1000);
}

// Start the auction
function startAuction() {
    if (players.filter(p => p.status === "waiting").length === 0) {
        alert("No players available for auction!");
        return;
    }
    
    auctionState.status = "active";
    document.getElementById('auction-state').textContent = "Active";
    document.getElementById('start-auction-btn').textContent = "Resume Auction";
    
    // Move to first player if none selected
    if (!auctionState.currentPlayer) {
        moveToNextPlayer();
    } else {
        // Resume with current player
        const player = players.find(p => p.name === auctionState.currentPlayer);
        if (player) {
            player.status = "active";
            startTimer();
        }
    }
    
    addChatMessage("Admin", "Auction has started!");
}

// Pause the auction
function pauseAuction() {
    auctionState.status = "paused";
    document.getElementById('auction-state').textContent = "Paused";
    clearInterval(auctionState.timer);
    addChatMessage("Admin", "Auction has been paused.");
}

// Move to the next player
function moveToNextPlayer() {
    // Mark current player as unsold if exists and has no bids
    if (auctionState.currentPlayer && !auctionState.currentBidder) {
        const current = players.find(p => p.name === auctionState.currentPlayer);
        if (current) {
            current.status = "unsold";
        }
    }
    
    // Clear current auction state
    clearInterval(auctionState.timer);
    
    // Find next waiting player
    const nextPlayer = players.find(p => p.status === "waiting");
    if (!nextPlayer) {
        alert("No more players in queue!");
        auctionState.currentPlayer = null;
        auctionState.status = "inactive";
        document.getElementById('auction-state').textContent = "Completed";
        document.getElementById('start-auction-btn').textContent = "Start Auction";
        addChatMessage("Admin", "Auction has ended! No more players available.");
        return;
    }
    
    // Set up new player
    nextPlayer.status = "active";
    auctionState.currentPlayer = nextPlayer.name;
    auctionState.currentBid = nextPlayer.basePrice;
    auctionState.currentBidder = null;
    auctionState.timeLeft = parseInt(document.getElementById('timer-duration').value) || 30;
    
    // Update UI
    updateCurrentPlayerDisplay();
    updateNextPlayersQueue();
    updateBidHistory(true); // Clear bid history
    
    addChatMessage("Admin", `Now bidding for ${nextPlayer.name} - Base price: $${nextPlayer.basePrice.toLocaleString()}`);
    
    // Start timer if auction is active
    if (auctionState.status === "active") {
        startTimer();
    }
}

// Mark current player as sold
function markPlayerAsSold() {
    if (!auctionState.currentPlayer || !auctionState.currentBidder) {
        alert("No player or current bid to mark as sold!");
        return;
    }
    
    const player = players.find(p => p.name === auctionState.currentPlayer);
    if (!player) return;
    
    player.status = "sold";
    player.soldTo = auctionState.currentBidder;
    player.soldPrice = auctionState.currentBid;
    
    // Deduct amount from winning team's purse
    const winningTeam = teams[auctionState.currentBidder];
    winningTeam.purse -= auctionState.currentBid;
    
    // Add player to the team
    winningTeam.players.push({
        name: player.name,
        category: player.category,
        price: auctionState.currentBid
    });
    
    clearInterval(auctionState.timer);
    
    addChatMessage("Admin", `${player.name} SOLD to ${auctionState.currentBidder} for $${auctionState.currentBid.toLocaleString()}!`);
    
    // Update UI
    updateTeamsList();
    if (document.getElementById('user-team').textContent === auctionState.currentBidder) {
        document.getElementById('user-purse').textContent = `$${winningTeam.purse.toLocaleString()}`;
        updateTeamPlayersList(auctionState.currentBidder);
    }
    
    // Auto move to next player after 3 seconds
    setTimeout(() => {
        if (auctionState.status === "active") {
            moveToNextPlayer();
        }
    }, 3000);
}

// Mark current player as unsold
function markPlayerAsUnsold() {
    if (!auctionState.currentPlayer) {
        alert("No player to mark as unsold!");
        return;
    }
    
    const player = players.find(p => p.name === auctionState.currentPlayer);
    if (!player) return;
    
    player.status = "unsold";
    clearInterval(auctionState.timer);
    
    addChatMessage("Admin", `${player.name} UNSOLD!`);
    
    // Auto move to next player after 3 seconds
    setTimeout(() => {
        if (auctionState.status === "active") {
            moveToNextPlayer();
        }
    }, 3000);
}

// Update Team Players List
function updateTeamPlayersList(teamName) {
    const teamPlayersTable = document.getElementById('team-players');
    
    if (!teams[teamName] || teams[teamName].players.length === 0) {
        teamPlayersTable.innerHTML = `
            <tr>
                <td colspan="3" class="empty-message">You haven't acquired any players yet</td>
            </tr>
        `;
        return;
    }
    
    teamPlayersTable.innerHTML = '';
    teams[teamName].players.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.name}</td>
            <td><span class="badge badge-${player.category}">${capitalizeFirstLetter(player.category)}</span></td>
            <td>$${player.price.toLocaleString()}</td>
        `;
        teamPlayersTable.appendChild(row);
    });
}

// Update bid history
function updateBidHistory(clear = false) {
    const bidHistoryContainer = document.getElementById('bid-history-container');
    
    if (clear) {
        bidHistoryContainer.innerHTML = '<div class="empty-message">No bids yet</div>';
        return;
    }
    
    // Remove "no bids" message if present
    if (bidHistoryContainer.querySelector('.empty-message')) {
        bidHistoryContainer.innerHTML = '';
    }
    
    // Add new bid to history
    const bidItem = document.createElement('div');
    bidItem.className = 'bid-item';
    bidItem.innerHTML = `
        <div><strong>${auctionState.currentBidder}</strong></div>
        <div>$${auctionState.currentBid.toLocaleString()}</div>
    `;
    bidHistoryContainer.insertBefore(bidItem, bidHistoryContainer.firstChild);
}

// Add message to chat
function addChatMessage(sender, message) {
    const chatArea = document.getElementById('chat-area');
    const chatMessage = document.createElement('div');
    chatMessage.className = 'chat-message';
    
    if (sender === document.getElementById('user-team').textContent) {
        chatMessage.className += ' self';
    }
    
    chatMessage.innerHTML = `<span>${sender}:</span> ${message}`;
    chatArea.appendChild(chatMessage);
    
    // Scroll to bottom
    chatArea.scrollTop = chatArea.scrollHeight;
}

// Place bid function
function placeBid(teamName, amount) {
    if (auctionState.status !== "active") {
        alert("Auction is not active!");
        return false;
    }
    
    if (!auctionState.currentPlayer) {
        alert("No player currently up for auction!");
        return false;
    }
    
    // Validate bid amount
    if (amount <= auctionState.currentBid) {
        alert(`Bid must be higher than current bid of $${auctionState.currentBid.toLocaleString()}`);
        return false;
    }
    
    // Check if team has enough money
    if (teams[teamName].purse < amount) {
        alert("You don't have enough money for this bid!");
        return false;
    }
    
    // Update auction state
    auctionState.currentBid = amount;
    auctionState.currentBidder = teamName;
    
    // Add 10 seconds to timer if less than 10 seconds left
    if (auctionState.timeLeft < 10) {
        auctionState.timeLeft = 10;
    }
    
    // Update UI
    updateCurrentPlayerDisplay();
    updateTeamsList();
    updateBidHistory();
    
    addChatMessage("Admin", `${teamName} bids $${amount.toLocaleString()}`);
    
    return true;
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Toggle Register/Login View
document.getElementById('show-register').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-view').querySelector('.login-container').style.display = 'none';
    document.getElementById('register-view').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('register-view').style.display = 'none';
    document.getElementById('login-view').querySelector('.login-container').style.display = 'block';
});

// Toggle Admin Code Field Visibility
document.getElementById('admin-checkbox').addEventListener('change', function () {
    document.getElementById('admin-code-group').style.display = this.checked ? 'block' : 'none';
});

// Register Team
document.getElementById('register-btn').addEventListener('click', () => {
    const username = document.getElementById('new-username').value.trim();
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const wantsAdmin = document.getElementById('admin-checkbox').checked;
    const adminCode = document.getElementById('admin-code').value;

    if (!username || !password) {
        alert('Please enter a team name and password');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    if (teams[username]) {
        alert('This team name is already taken. Please choose another.');
        return;
    }

    let isAdmin = false;
    if (wantsAdmin && adminCode === adminAccessCode) {
        isAdmin = true;
        alert('Admin privileges granted!');
    } else if (wantsAdmin) {
        alert('Invalid admin code. Team registered without admin privileges.');
    }

    // Register the team
    teams[username] = {
        password: password,
        purse: parseInt(document.getElementById('starting-purse').value) || 10000000, // Starting purse
        players: [],
        isAdmin: isAdmin,
    };

    alert('Team registered successfully!');
    updateTeamsList(); // Update "All Teams" list dynamically

    // Clear and reset form
    document.getElementById('new-username').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    document.getElementById('admin-checkbox').checked = false;
    document.getElementById('admin-code').value = '';
    document.getElementById('admin-code-group').style.display = 'none';

    document.getElementById('register-view').style.display = 'none';
    document.getElementById('login-view').querySelector('.login-container').style.display = 'block';
});

// Login Functionality
document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please enter your team name and password');
        return;
    }

    if (!teams[username]) {
        alert('Team not found. Please register first.');
        return;
    }

    if (teams[username].password !== password) {
        alert('Incorrect password. Please try again.');
        return;
    }

    // Successful login
    document.getElementById('login-view').style.display = 'none';
    document.getElementById('auction-view').style.display = 'block';
    document.getElementById('user-team').textContent = username;
    document.getElementById('user-purse').textContent = `$${teams[username].purse.toLocaleString()}`;

    if (teams[username].isAdmin) {
        document.getElementById('admin-view').style.display = 'block';
        updateAdminPlayerList();
    }

    updateTeamsList(); // Update "All Teams" list when team logs in
    updateNextPlayersQueue();
    updateTeamPlayersList(username);
    
    // If auction is already active, show current player
    if (auctionState.currentPlayer) {
        updateCurrentPlayerDisplay();
    }
    
    addChatMessage("Admin", `${username} has joined the auction!`);
});

// Admin: Change Admin Access Code
document.getElementById('set-admin-code-btn').addEventListener('click', () => {
    const newCode = document.getElementById('admin-access-code').value;
    if (!newCode) {
        alert('Please enter a valid access code');
        return;
    }
    
    adminAccessCode = newCode;
    alert(`Admin access code updated to: ${newCode}`);
});

// Admin: Add New Player
document.getElementById('add-player-btn').addEventListener('click', () => {
    const name = document.getElementById('add-player-name').value.trim();
    const category = document.getElementById('add-player-category').value;
    const price = parseInt(document.getElementById('add-player-price').value);
    
    if (!name || !category || isNaN(price)) {
        alert('Please enter all player details');
        return;
    }
    
    const newPlayer = {
        name: name,
        category: category,
        basePrice: price,
        description: `${category === 'batter' ? 'Batter' : category === 'pitcher' ? 'Bowler' : 'All-Rounder'}`,
        status: "waiting"
    };
    
    players.push(newPlayer);
    alert(`Player ${name} added to auction queue`);
    
    // Clear form
    document.getElementById('add-player-name').value = '';
    document.getElementById('add-player-price').value = '';
    
    updateAdminPlayerList();
    updateNextPlayersQueue();
});

// Admin: Start Auction
document.getElementById('start-auction-btn').addEventListener('click', () => {
    startAuction();
});

// Admin: Pause Auction
document.getElementById('pause-auction-btn').addEventListener('click', () => {
    pauseAuction();
});

// Admin: Next Player
document.getElementById('next-player-btn').addEventListener('click', () => {
    moveToNextPlayer();
});

// Admin: Mark Player as Sold
document.getElementById('sold-player-btn').addEventListener('click', () => {
    markPlayerAsSold();
});

// Admin: Mark Player as Unsold
document.getElementById('unsold-player-btn').addEventListener('click', () => {
    markPlayerAsUnsold();
});

// Place Bid
document.getElementById('place-bid-btn').addEventListener('click', () => {
    const teamName = document.getElementById('user-team').textContent;
    const bidAmount = parseInt(document.getElementById('bid-amount').value);
    
    placeBid(teamName, bidAmount);
});

// Send Chat Message
document.getElementById('send-message-btn').addEventListener('click', () => {
    const message = document.getElementById('chat-input').value.trim();
    if (!message) return;
    
    const teamName = document.getElementById('user-team').textContent;
    addChatMessage(teamName, message);
    
    document.getElementById('chat-input').value = '';
});

// Enter key for chat
document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('send-message-btn').click();
    }
});

// Initialize UI
updateTeamsList();
updateNextPlayersQueue();