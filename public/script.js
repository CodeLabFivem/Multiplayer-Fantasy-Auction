document.addEventListener('DOMContentLoaded', function() {
    const teams = {};
    let adminAccessCode = "admin123";

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
                <button class="auction-button" data-index="${index}">Start Auction</button>
            `;
            adminPlayerList.appendChild(playerCard);
            
            // Add event listener separately to avoid serialization issues
            const button = playerCard.querySelector('.auction-button');
            button.addEventListener('click', function() {
                socket.emit('startAuction', index);
            });
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

    function setupUI() {
        // Basic UI setup for register/login views
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

        // Register button
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

        // Login button
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

        // Chat functionality
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

    // Set up UI elements and request initial state
    setupUI();
    socket.emit('requestInitialState');
});
