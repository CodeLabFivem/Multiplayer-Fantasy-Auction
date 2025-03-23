document.addEventListener('DOMContentLoaded', function() {
    const teams = {};
    let adminAccessCode = "admin123";

    const players = [
        {
            name: "Virat Kohli",
            category: "batter",
            basePrice: 1500000,
            description: "Right-handed top-order batter",
            status: "waiting"
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
        status: "inactive",
        currentPlayer: null,
        currentBid: 0,
        currentBidder: null,
        timeLeft: 45,
        timer: null
    };

    if (typeof io === 'undefined') {
        alert('Communication functionality not available. Please check console for details.');
        setupBasicUI();
        return;
    }

    const socket = io();
    let currentUser = null;

    socket.on('connect', () => {
        console.log('Connected to server with id:', socket.id);
        socket.emit('requestInitialState');
    });

    socket.on('initialState', (data) => {
        console.log('Received initial state:', data);
        
        Object.assign(teams, data.teams);
        players.length = 0;
        players.push(...data.players);
        Object.assign(auctionState, data.auctionState);
        adminAccessCode = data.adminAccessCode;
        
        updateTeamsList();
        updateNextPlayersQueue();
        
        if (currentUser) {
            document.getElementById('user-purse').textContent = `$${teams[currentUser].purse.toLocaleString()}`;
            updateTeamPlayersList(currentUser);
        }
        
        if (auctionState.currentPlayer) {
            updateCurrentPlayerDisplay();
            
            if (auctionState.status === "active") {
                startTimer();
            }
        }
    });

    socket.on('teamsUpdate', (updatedTeams) => {
        Object.assign(teams, updatedTeams);
        updateTeamsList();
        
        if (currentUser && teams[currentUser]) {
            document.getElementById('user-purse').textContent = `$${teams[currentUser].purse.toLocaleString()}`;
            updateTeamPlayersList(currentUser);
        }
    });

    socket.on('playersUpdate', (updatedPlayers) => {
        players.length = 0;
        players.push(...updatedPlayers);
        updateNextPlayersQueue();
        
        if (currentUser && teams[currentUser]) {
            updateTeamPlayersList(currentUser);
        }
        
        if (auctionState.currentPlayer) {
            updateCurrentPlayerDisplay();
        }
        
        if (document.getElementById('admin-view') && document.getElementById('admin-view').style.display !== 'none') {
            updateAdminPlayerList();
        }
    });

// Handle auction state updates
socket.on('auctionUpdate', (updatedAuctionState) => {
    // Update local auction state
    auctionState = updatedAuctionState;
    
    // Update UI
    updateCurrentPlayerDisplay();
    
    // Enable/disable bid controls based on auction status
    const bidAmountInput = document.getElementById('bid-amount');
    const placeBidButton = document.getElementById('place-bid-btn');
    if (auctionState.status === "active") {
        bidAmountInput.disabled = false;
        placeBidButton.disabled = false;
    } else {
        bidAmountInput.disabled = true;
        placeBidButton.disabled = true;
    }
});

    socket.on('timerUpdate', (timeLeft) => {
        if (auctionState.status === "active") {
            document.getElementById('timer').textContent = timeLeft;
        }
    });

    socket.on('chatMessage', (data) => {
        const chatBox = document.getElementById('chat-box');
        if (chatBox) {
            const messageElement = document.createElement('div');
            messageElement.className = 'chat-message';
            messageElement.innerHTML = `<strong>${data.sender}:</strong> ${data.message}`;
            chatBox.appendChild(messageElement);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    });

    function updateTeamsList() {
        const teamList = document.getElementById('team-list');
        if (!teamList) {
            console.error('Could not find team-list element');
            return;
        }

        teamList.innerHTML = '';

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

    function updateNextPlayersQueue() {
        const nextPlayersList = document.getElementById('next-players-list');
        if (!nextPlayersList) {
            console.error('Could not find next-players-list element');
            return;
        }

        nextPlayersList.innerHTML = '';

        players.forEach((player, index) => {
            if (player.status === "waiting") {
                const playerCard = document.createElement('div');
                playerCard.className = 'player-card';
                playerCard.innerHTML = `
                    <div class="player-name">${player.name}</div>
                    <div class="player-category">${player.category}</div>
                    <div class="player-price">Base Price: $${player.basePrice.toLocaleString()}</div>
                `;
                nextPlayersList.appendChild(playerCard);
            }
        });

        if (!players.some(player => player.status === "waiting")) {
            nextPlayersList.innerHTML = '<div class="empty-message">No players left in the queue</div>';
        }
    }

    function updateTeamPlayersList(teamName) {
        const teamPlayersList = document.getElementById('team-players-list');
        if (!teamPlayersList) {
            console.error('Could not find team-players-list element');
            return;
        }

        teamPlayersList.innerHTML = '';

        if (teams[teamName]) {
            teams[teamName].players.forEach(player => {
                const playerCard = document.createElement('div');
                playerCard.className = 'player-card';
                playerCard.innerHTML = `
                    <div class="player-name">${player.name}</div>
                    <div class="player-price">Price: $${player.price.toLocaleString()}</div>
                `;
                teamPlayersList.appendChild(playerCard);
            });
        }
    }

    function updateCurrentPlayerDisplay() {
        const currentPlayerDisplay = document.getElementById('current-player-display');
        if (!currentPlayerDisplay) {
            console.error('Could not find current-player-display element');
            return;
        }

        if (auctionState.currentPlayer) {
            currentPlayerDisplay.innerHTML = `
                <div class="player-name">${auctionState.currentPlayer.name}</div>
                <div class="player-category">${auctionState.currentPlayer.category}</div>
                <div class="player-price">Current Bid: $${auctionState.currentBid.toLocaleString()}</div>
                <div class="player-bidder">Current Bidder: ${auctionState.currentBidder || 'None'}</div>
            `;
        } else {
            currentPlayerDisplay.innerHTML = '<div class="empty-message">No player currently being auctioned</div>';
        }
    }

    function updateAdminPlayerList() {
        const adminPlayerList = document.getElementById('admin-player-list');
        if (!adminPlayerList) {
            console.error('Could not find admin-player-list element');
            return;
        }

        adminPlayerList.innerHTML = '';

        players.forEach((player, index) => {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card';
            playerCard.innerHTML = `
                <div class="player-name">${player.name}</div>
                <div class="player-category">${player.category}</div>
                <div class="player-price">Base Price: $${player.basePrice.toLocaleString()}</div>
                <div class="player-status">Status: ${player.status}</div>
                <button onclick="socket.emit('startAuction', ${index})">Start Auction</button>
            `;
            adminPlayerList.appendChild(playerCard);
        });
    }

    function startTimer() {
        if (auctionState.timer) {
            clearInterval(auctionState.timer);
        }

        auctionState.timer = setInterval(() => {
            if (auctionState.timeLeft > 0) {
                auctionState.timeLeft--;
                socket.emit('updateTimer', auctionState.timeLeft);
            } else {
                clearInterval(auctionState.timer);
                socket.emit('endAuction', false);
            }
        }, 1000);
    }

    function setupBasicUI() {
        const showRegisterBtn = document.getElementById('show-register');
        const showLoginBtn = document.getElementById('show-login');
        
        if (showRegisterBtn) {
            showRegisterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const loginContainer = document.querySelector('#login-view .login-container');
                const registerView = document.getElementById('register-view');
                
                if (loginContainer) loginContainer.style.display = 'none';
                if (registerView) registerView.style.display = 'block';
            });
        }
        
        if (showLoginBtn) {
            showLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const registerView = document.getElementById('register-view');
                const loginContainer = document.querySelector('#login-view .login-container');
                
                if (registerView) registerView.style.display = 'none';
                if (loginContainer) loginContainer.style.display = 'block';
            });
        }

        const adminCheckbox = document.getElementById('admin-checkbox');
        const adminCodeGroup = document.getElementById('admin-code-group');
        
        if (adminCheckbox && adminCodeGroup) {
            adminCheckbox.addEventListener('change', function() {
                adminCodeGroup.style.display = this.checked ? 'block' : 'none';
            });
        }

        alert('Server communication is not available. Basic UI elements will work, but you cannot connect to the auction server.');
    }

    function setupEventListeners() {
        const showRegisterBtn = document.getElementById('show-register');
        const showLoginBtn = document.getElementById('show-login');
        
        if (showRegisterBtn) {
            showRegisterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const loginContainer = document.querySelector('#login-view .login-container');
                const registerView = document.getElementById('register-view');
                
                if (loginContainer) loginContainer.style.display = 'none';
                if (registerView) registerView.style.display = 'block';
            });
        }
        
        if (showLoginBtn) {
            showLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const registerView = document.getElementById('register-view');
                const loginContainer = document.querySelector('#login-view .login-container');
                
                if (registerView) registerView.style.display = 'none';
                if (loginContainer) loginContainer.style.display = 'block';
            });
        }

        const adminCheckbox = document.getElementById('admin-checkbox');
        const adminCodeGroup = document.getElementById('admin-code-group');
        
        if (adminCheckbox && adminCodeGroup) {
            adminCheckbox.addEventListener('change', function() {
                adminCodeGroup.style.display = this.checked ? 'block' : 'none';
            });
        }

        const registerBtn = document.getElementById('register-btn');
if (registerBtn) {
    registerBtn.addEventListener('click', () => {
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
        } else if (wantsAdmin) {
            alert('Invalid admin code. Team registered without admin privileges.');
        }

        // Get the starting purse value
        const startingPurse = parseInt(document.getElementById('starting-purse').value) || 10000000;

        // Register the team via server
        socket.emit('registerTeam', {
            username,
            password,
            purse: startingPurse,
            isAdmin
        });

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
}

        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
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

                const loginView = document.getElementById('login-view');
                const auctionView = document.getElementById('auction-view');
                const userTeam = document.getElementById('user-team');
                const userPurse = document.getElementById('user-purse');
                
                if (loginView) loginView.style.display = 'none';
                if (auctionView) auctionView.style.display = 'block';
                if (userTeam) userTeam.textContent = username;
                if (userPurse) userPurse.textContent = `$${teams[username].purse.toLocaleString()}`;
                
                currentUser = username;
                
                socket.emit('userLogin', username);

                if (teams[username].isAdmin) {
                    const adminView = document.getElementById('admin-view');
                    if (adminView) {
                        adminView.style.display = 'block';
                        updateAdminPlayerList();
                    }
                }

                updateTeamsList();
                updateNextPlayersQueue();
                updateTeamPlayersList(username);
                
                if (auctionState.currentPlayer) {
                    updateCurrentPlayerDisplay();
                }
                
                socket.emit('sendChatMessage', {
                    sender: "Admin",
                    message: `${username} has joined the auction!`
                });

                setupEventListeners();
            });
        }

// Place Bid Button
const placeBidButton = document.getElementById('place-bid-btn');
if (placeBidButton) {
    placeBidButton.addEventListener('click', () => {
        const bidAmount = parseInt(document.getElementById('bid-amount').value);
        if (bidAmount && currentUser) {
            // Emit the bid to the server
            socket.emit('placeBid', { bidder: currentUser, amount: bidAmount });
        } else {
            alert('Please enter a valid bid amount.');
        }
    });
}

        // Start Auction Button
    const startAuctionButton = document.getElementById('start-auction-btn');
    if (startAuctionButton) {
        startAuctionButton.addEventListener('click', () => {
            const playerIndexInput = document.getElementById('player-index');
            if (playerIndexInput) {
                const playerIndex = parseInt(playerIndexInput.value);
                if (!isNaN(playerIndex)) {
                    socket.emit('startAuction', playerIndex);
                } else {
                    alert('Please enter a valid player index.');
                }
            } else {
                console.error('player-index input field not found');
            }
        });
    }

    // Pause Auction Button
    const pauseAuctionButton = document.getElementById('pause-auction-btn');
    if (pauseAuctionButton) {
        pauseAuctionButton.addEventListener('click', () => {
            socket.emit('pauseAuction');
        });
    }

    // Next Player Button
const nextPlayerButton = document.getElementById('next-player-btn');
if (nextPlayerButton) {
    nextPlayerButton.addEventListener('click', () => {
        socket.emit('nextPlayer');
    });
}

    // Mark as Sold Button
    const soldPlayerButton = document.getElementById('sold-player-btn');
    if (soldPlayerButton) {
        soldPlayerButton.addEventListener('click', () => {
            socket.emit('endAuction', true); // Mark as sold
        });
    }

    // Mark as Unsold Button
    const unsoldPlayerButton = document.getElementById('unsold-player-btn');
    if (unsoldPlayerButton) {
        unsoldPlayerButton.addEventListener('click', () => {
            socket.emit('endAuction', false); // Mark as unsold
        });
    }
        const sendMessageButton = document.getElementById('send-message-btn');
        if (sendMessageButton) {
            sendMessageButton.addEventListener('click', () => {
                const chatInput = document.getElementById('chat-input');
                if (chatInput && chatInput.value.trim() && currentUser) {
                    socket.emit('sendChatMessage', {
                        sender: currentUser,
                        message: chatInput.value.trim()
                    });
                    chatInput.value = ''; // Clear the input field
                }
            });
        }
    }

    setupEventListeners();
    socket.emit('requestInitialState');
});
