const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let teams = {};
let players = [
    // Chennai Super Kings
    { name: "Ruturaj Gaikwad", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Ravindra Jadeja", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Matheesha Pathirana", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Shivam Dube", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "MS Dhoni", category: "batter/wicketkeeper", basePrice: 30000000, status: "waiting" },
    { name: "Devon Conway", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Rahul Tripathi", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Rachin Ravindra", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Ravichandran Ashwin", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Syed Khaleel Ahmed", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Noor Ahmad", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Vijay Shankar", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Sam Curran", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Shaik Rasheed", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Anshul Kamboj", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Mukesh Choudhary", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Deepak Hooda", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Gurjapneet Singh", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Nathan Ellis", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Ramakrishna Ghosh", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Kamlesh Nagarkoti", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Jamie Overton", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Shreyas Gopal", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Vansh Bedi", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "C Andre Siddarth", category: "batter", basePrice: 30000000, status: "waiting" },

    // Delhi Capitals
    { name: "Axar Patel", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Kuldeep Yadav", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Tristan Stubbs", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Abishek Porel", category: "batter/wicketkeeper", basePrice: 30000000, status: "waiting" },
    { name: "Mitchell Starc", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "KL Rahul", category: "batter/wicketkeeper", basePrice: 30000000, status: "waiting" },
    { name: "Jake Fraser-Mcgurk", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "T Natarajan", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Karun Nair", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Sameer Rizvi", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Ashutosh Sharma", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Mohit Sharma", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Faf du Plessis", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Mukesh Kumar", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Darshan Nalkande", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Vipraj Nigam", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Dushmantha Chameera", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Donovan Ferreira", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Ajay Mandal", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Manvanth Kumar", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Madhav Tiwari", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Tripurana Vijay", category: "allrounder", basePrice: 30000000, status: "waiting" },

    // Gujarat Titans
    { name: "Rashid Khan", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Shubman Gill", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Sai Sudharsan", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Rahul Tewatia", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Shahrukh Khan", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Kagiso Rabada", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Jos Buttler", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Mohammad Siraj", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Prasidh Krishna", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Nishant Sindhu", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Mahipal Lomror", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Kumar Kushagra", category: "wicketkeeper/batter", basePrice: 30000000, status: "waiting" },
    { name: "Anuj Rawat", category: "wicketkeeper/batter", basePrice: 30000000, status: "waiting" },
    { name: "Manav Suthar", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Washington Sundar", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Gerald Coetzee", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Arshad Khan", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Gurnoor Brar", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Sherfane Rutherford", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "R Sai Kishore", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Ishant Sharma", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Jayant Yadav", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Glenn Phillips", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Karim Janat", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Kulwant Khejroliya", category: "bowler", basePrice: 30000000, status: "waiting" },

    // Kolkata Knight Riders
    { name: "Rinku Singh", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Varun Chakaravarthy", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Sunil Narine", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Andre Russell", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Harshit Rana", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Ramandeep Singh", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Venkatesh Iyer", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Quinton de Kock", category: "wicketkeeper/batter", basePrice: 30000000, status: "waiting" },
    { name: "Rahmanullah Gurbaz", category: "wicketkeeper/batter", basePrice: 30000000, status: "waiting" },
    { name: "Anrich Nortje", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Angkrish Raghuvanshi", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Vaibhav Arora", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Mayank Markande", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Rovman Powell", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Manish Pandey", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Spencer Johnson", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Luvnith Sisodia", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Ajinkya Rahane", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Anukul Roy", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Moeen Ali", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Chetan Sakariya", category: "bowler", basePrice: 30000000, status: "waiting" },

    // Lucknow Super Giants
    { name: "Nicholas Pooran", category: "wicketkeeper/batter", basePrice: 30000000, status: "waiting" },
    { name: "Ravi Bishnoi", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Mayank Yadav", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Ayush Badoni", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Shardul Thakur", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Rishabh Pant", category: "wicketkeeper/batter", basePrice: 30000000, status: "waiting" },
    { name: "David Miller", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Mitchell Marsh", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Aiden Markram", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Avesh Khan", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Abdul Samad", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Aryan Juyal", category: "wicketkeeper/batter", basePrice: 30000000, status: "waiting" },
    { name: "Akash Deep", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Himmat Singh", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "M Siddharth", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Digvesh Singh", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Shahbaz Ahmed", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Akash Singh", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Shamar Joseph", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Prince Yadav", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Yuvraj Chaudhary", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Rajvardhan Hangargekar", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Arshin Kulkarni", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Matthew Breetzke", category: "batter", basePrice: 30000000, status: "waiting" },

    // Mumbai Indians
    { name: "Jasprit Bumrah", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Suryakumar Yadav", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Hardik Pandya", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Rohit Sharma", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Tilak Varma", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Trent Boult", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Naman Dhir", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Robin Minz", category: "wicketkeeper/batter", basePrice: 30000000, status: "waiting" },
    { name: "Karn Sharma", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Ryan Rickelton", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Deepak Chahar", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Mujeeb-ur-Rahman", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Will Jacks", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Ashwani Kumar", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Mitchell Santner", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Reece Topley", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Shrijith Krishnan", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Raj Bawa", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Satyanarayana Raju", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Bevon Jacobs", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Arjun Tendulkar", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Vignesh Puthur", category: "allrounder", basePrice: 30000000, status: "waiting" },

    // Punjab Kings
    { name: "Shashank Singh", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Prabhsimran Singh", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Arshdeep Singh", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Shreyas Iyer", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Yuzvendra Chahal", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Marcus Stoinis", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Glenn Maxwell", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Nehal Wadhera", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Harpreet Brar", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Vishnu Vinod", category: "wicketkeeper/batter", basePrice: 30000000, status: "waiting" },
    { name: "Vijaykumar Vyshak", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Yash Thakur", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Marco Jansen", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Josh Inglis", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Lockie Ferguson", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Azmatullah Omarzai", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Harnoor Pannu", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Kuldeep Sen", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Priyansh Arya", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Aaron Hardie", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Suryash Shedge", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Musheer Khan", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Xavier Bartlett", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Pyla Avinash", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Praveen Dubey", category: "allrounder", basePrice: 30000000, status: "waiting" },

    // Rajasthan Royals
    { name: "Sanju Samson", category: "batter/wicketkeeper", basePrice: 30000000, status: "waiting" },
    { name: "Yashasvi Jaiswal", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Riyan Parag", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Dhruv Jurel", category: "batter/wicketkeeper", basePrice: 30000000, status: "waiting" },
    { name: "Shimron Hetmyer", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Sandeep Sharma", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Jofra Archer", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Mahesh Theekshana", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Wanindu Hasaranga", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Akash Madhwal", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Kumar Kartikeya Singh", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Nitish Rana", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Tushar Deshpande", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Shubham Dubey", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Yudhvir Charak", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Fazalhaq Farooqi", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Vaibhav Suryavanshi", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Kwena Maphaka", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Ashok Sharma", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Kunal Singh Rathore", category: "batter", basePrice: 30000000, status: "waiting" },

    // Royal Challengers Bangalore
    { name: "Virat Kohli", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Rajat Patidar", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Yash Dayal", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Liam Livingstone", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Phil Salt", category: "wicketkeeper/batter", basePrice: 30000000, status: "waiting" },
    { name: "Jitesh Sharma", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Josh Hazlewood", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Rasikh Dar", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Suyash Sharma", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Krunal Pandya", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Bhuvneshwar Kumar", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Swapnil Singh", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Tim David", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Romario Shepherd", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Nuwan Thushara", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Manoj Bhandage", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Jacob Bethell", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Devdutt Padikkal", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Swastik Chikara", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Mohit Rathee", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Abhinandan Singh", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Lungi Ngidi", category: "bowler", basePrice: 30000000, status: "waiting" },

    // Sunrisers Hyderabad
    { name: "Heinrich Klaasen", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Pat Cummins", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Abhishek Sharma", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Travis Head", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Nitish Kumar Reddy", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Mohammad Shami", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Harshal Patel", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Ishan Kishan", category: "wicketkeeper/batter", basePrice: 30000000, status: "waiting" },
    { name: "Rahul Chahar", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Adam Zampa", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Atharva Taide", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Abhinav Manohar", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Simarjeet Singh", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Zeeshan Ansari", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Jaydev Unadkat", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Kamindu Mendis", category: "allrounder", basePrice: 30000000, status: "waiting" },
    { name: "Aniket Verma", category: "batter", basePrice: 30000000, status: "waiting" },
    { name: "Eshan Malinga", category: "bowler", basePrice: 30000000, status: "waiting" },
    { name: "Sachin Baby", category: "batter", basePrice: 30000000, status: "waiting" }
];
let auctionState = { status: "inactive", currentPlayer: null, currentBid: 0, currentBidder: null, timeLeft: 45 };
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
            auctionState.timeLeft = 45; // Reset timer
            
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

            // Dynamically update the next players list
            updateNextPlayersList(players);
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
            auctionState.timeLeft = 45;
            
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
