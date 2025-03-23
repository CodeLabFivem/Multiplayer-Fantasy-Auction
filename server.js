const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let teams = {};
let players = [
    { name: "Virat Kohli", category: "batter", basePrice: 1500000, status: "waiting" },
    { name: "Jasprit Bumrah", category: "pitcher", basePrice: 1200000, status: "waiting" },
    { name: "Ben Stokes", category: "allrounder", basePrice: 1300000, status: "waiting" },
    { name: "MS Dhoni", category: "batter", basePrice: 1100000, status: "waiting" }
];
let auctionState = { status: "inactive", currentPlayer: null, currentBid: 0, currentBidder: null, timeLeft: 30 };
let adminAccessCode = "admin123";

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('A user connected with id:', socket.id);

    // Handle initial state request
    socket.on('requestInitialState', () => {
        socket.emit('initialState', { teams, players, auctionState, adminAccessCode });
    });

    // Handle team registration
    socket.on('registerTeam', (data) => {
        if (!teams[data.username]) {
            teams[data.username] = { password: data.password, purse: data.purse, players: [], isAdmin: data.isAdmin };
            io.emit('teamsUpdate', teams);
            console.log(`Team ${data.username} registered.`);
        }
    });

    // Handle user login
    socket.on('userLogin', (username) => {
        console.log(`${username} has logged in.`);
        socket.emit('initialState', { teams, players, auctionState, adminAccessCode });
    });

    // Handle chat message
    socket.on('sendChatMessage', (data) => {
        io.emit('chatMessage', data);
    });

    // Handle bidding
// Handle bidding
// Handle bidding
socket.on('placeBid', (data) => {
    console.log(`Bid received: ${data.bidder} bids $${data.amount}`);
    
    if (auctionState.status === "active" && auctionState.currentPlayer) {
        if (data.amount > auctionState.currentBid && teams[data.bidder] && teams[data.bidder].purse >= data.amount) {
            // Update auction state
            auctionState.currentBid = data.amount;
            auctionState.currentBidder = data.bidder;
            
            // Serialize auctionState to avoid circular references
            const serializedAuctionState = {
                status: auctionState.status,
                currentPlayer: auctionState.currentPlayer ? {
                    name: auctionState.currentPlayer.name,
                    category: auctionState.currentPlayer.category,
                    basePrice: auctionState.currentPlayer.basePrice
                } : null,
                currentBid: auctionState.currentBid,
                currentBidder: auctionState.currentBidder,
                timeLeft: auctionState.timeLeft
            };
            
            // Broadcast updated auction state to all clients
            io.emit('auctionUpdate', serializedAuctionState);
            
            // Notify all clients about the new bid
            io.emit('chatMessage', {
                sender: "Admin",
                message: `${data.bidder} has bid $${data.amount.toLocaleString()} for ${auctionState.currentPlayer.name}`
            });
        } else {
            // Notify the bidder if their bid is invalid
            socket.emit('chatMessage', {
                sender: "Admin",
                message: "Your bid is invalid. Ensure the bid is higher than the current bid and within your purse limit."
            });
        }
    }
});


    // Handle starting auction for a player
    socket.on('startAuction', (playerIndex) => {
        console.log(`Starting auction for player index: ${playerIndex}`);
        
        if (playerIndex >= 0 && playerIndex < players.length && players[playerIndex].status === "waiting") {
            auctionState.status = "active";
            auctionState.currentPlayer = players[playerIndex];
            auctionState.currentBid = players[playerIndex].basePrice;
            auctionState.currentBidder = null;
            auctionState.timeLeft = 30; // Reset timer
            
            players[playerIndex].status = "active";
            
            io.emit('auctionUpdate', auctionState);
            io.emit('playersUpdate', players);

            // Start the timer
            startTimer();
        }
    });

    // Handle pausing the auction
    socket.on('pauseAuction', () => {
        if (auctionState.status === "active") {
            auctionState.status = "paused";
            io.emit('auctionUpdate', auctionState);
            clearInterval(auctionState.timer); // Stop the timer
        }
    });

    // Handle moving to the next player
    socket.on('nextPlayer', () => {
        if (auctionState.status === "active" || auctionState.status === "paused") {
            const nextPlayer = players.find(player => player.status === "waiting");
            if (nextPlayer) {
                const playerIndex = players.indexOf(nextPlayer);
                socket.emit('startAuction', playerIndex); // Start auction for the next player
            } else {
                io.emit('chatMessage', {
                    sender: "Admin",
                    message: "No more players left in the queue."
                });
            }
        }
    });

    // Handle ending auction
    socket.on('endAuction', (sold) => {
        console.log(`Ending auction with sold status: ${sold}`);
        
        if (auctionState.status === "active" && auctionState.currentPlayer) {
            const playerName = auctionState.currentPlayer.name;
            const playerIndex = players.findIndex(p => p.name === playerName);
            
            if (sold && auctionState.currentBidder) {
                // Player sold
                const buyer = auctionState.currentBidder;
                const price = auctionState.currentBid;
                
                if (playerIndex >= 0) {
                    players[playerIndex].status = "sold";
                }
                
                if (teams[buyer]) {
                    teams[buyer].players.push({
                        name: playerName,
                        price: price
                    });
                    teams[buyer].purse -= price;
                }
                
                io.emit('chatMessage', {
                    sender: "Admin",
                    message: `${playerName} has been sold to ${buyer} for $${price.toLocaleString()}`
                });
            } else {
                // Player unsold
                if (playerIndex >= 0) {
                    players[playerIndex].status = "unsold";
                }
                
                io.emit('chatMessage', {
                    sender: "Admin",
                    message: `${playerName} is unsold`
                });
            }
            
            // Reset auction state
            auctionState.status = "inactive";
            auctionState.currentPlayer = null;
            auctionState.currentBid = 0;
            auctionState.currentBidder = null;
            auctionState.timeLeft = 30;
            
            io.emit('auctionUpdate', auctionState);
            io.emit('playersUpdate', players);
            io.emit('teamsUpdate', teams);

            clearInterval(auctionState.timer); // Stop the timer
        }
    });

    // Handle timer events
    function startTimer() {
        if (auctionState.timer) {
            clearInterval(auctionState.timer);
        }

        auctionState.timer = setInterval(() => {
            if (auctionState.timeLeft > 0) {
                auctionState.timeLeft--;
                io.emit('timerUpdate', auctionState.timeLeft);
            } else {
                clearInterval(auctionState.timer);
                socket.emit('endAuction', false); // Mark as unsold if time runs out
            }
        }, 1000);
    }

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});