/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        let game = games[i];
        // create a new div element, which will become the game card
        let gameCard = document.createElement('div');
        gameCard.classList.add('game-card')

        // sets the inner HTML using a template literal to display some info 
        // about each game
        gameCard.innerHTML = `
        <img src="${game.img}" alt="${game.name}" class="game-img">
        <h2>${game.name}</h2>
        <p>${game.description}</p>
        <p>Backers: ${game.backers}</p>
        `;

        // appends the game to the games-container
        gamesContainer.appendChild(gameCard);
    }

}

addGamesToPage(GAMES_JSON)


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

const contributionsCard = document.getElementById("num-contributions");

// uses reduce() to count the number of total contributions by summing the backers
const totalContrib = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

contributionsCard.innerHTML = `<p>${totalContrib.toLocaleString()}</p>`;

// grabS the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalPledge = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);
raisedCard.innerHTML = `<p>$${totalPledge.toLocaleString()}</p>`;
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML =`<p>${GAMES_JSON.length}</p>`;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // uses filter() to get a list of games that have not yet met their goal
    const unfundGame = GAMES_JSON.filter(game => game.pledged < game.goal);

    // uses the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundGame);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // uses filter() to get a list of games that have met or exceeded their goal
    const fundGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // uses the function we previously created to add funded games to the DOM
    addGamesToPage(fundGames);
}

// shows all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // adds all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const UnfundedGames = GAMES_JSON.reduce((acc, game) => {
    if (game.pledged < game.goal) {
        return acc+1;
    }
    else {
        return acc;
    }
}, 0);


// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesString = `
    So far, we've raised $${totalPledge.toLocaleString()} across ${GAMES_JSON.length} games.
    ${UnfundedGames > 0 ?
        `Unfortunately, ${UnfundedGames} game${UnfundedGames === 1 ? '' : 's'} ${
            UnfundedGames === 1 ? 'remains' : 'remain'
        } unfunded.` :
        'All games have been fully funded!'
    }
`;

console.log(unfundedGamesString);


// create a new DOM element containing the template string and append it to the description container
const unfundedGamesParagraph = document.createElement('p');
unfundedGamesParagraph.innerHTML = unfundedGamesString;
descriptionContainer.appendChild(unfundedGamesParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement('p');
firstGameElement.textContent = `🥇 ${firstGame.name}`;
const secondGameElement = document.createElement('p');
secondGameElement.textContent = `🥈 ${secondGame.name}`;

// do the same for the runner up item
firstGameContainer.appendChild(firstGameElement);
secondGameContainer.appendChild(secondGameElement);