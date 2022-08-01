/* 
    Simple game clicking game that redirects to a new page after collecting enough targets
    By IsaacSol 
    GitHub https://github.com/IsaacSol/target-clicker

    How to play
    Copy script and enter it into your console.
    Ensure javascript is activated
    Enjoy :)
    
    Note some websites really don't like this so
*/
mySize = 35 // Size of targets
myTime = 100 // Time between each target spawning
myChildren = 0 // Current number of targets
maxChildren = 100 // Max targets allowed
scoreNeeded = 100 // Score to trip new location
// Note: I split the location to send into 2 parts so that the link wouldn't appear when sent via discord
locationToSendPart1 = "https://www.youtube.com/" 
locationToSendPart2 = "watch?v=ZR2kbO4TQAo" // New location
myScore = 0 // Number of targets hit
iGotClicked = function (me) {
    //Delete me
    me.style.visibility = "hidden";
    me.parentNode.removeChild(me); // Removes target
    myChildren--
    myScore++;
    console.log(myScore)
    try {
        // Updates the Score Keeper
        document.querySelector('[data-my-score]').innerHTML = "Score: " + myScore;
    } catch (err) {
        // Score Keeper doesn't exist
        injectCounter("Score: " + myScore) // Creates new score keeper
    }
    if (myScore > scoreNeeded) { // Determines whether it is time to send player to the link
        window.location.href = locationToSendPart1 + locationToSendPart2
    }
}
injectMe = function (body, myId) {

    // Subtracting by mySize ensures that no targets appear off the screen
    maxX = window.innerWidth - mySize; 
    maxY = document.body.clientHeight - mySize;

    // Sets a random position for target
    myX = Math.floor(Math.random() * maxX) 
    myY = Math.floor(Math.random() * maxY)
    
    body.innerHTML += `
        <div id="${myId}" onclick="iGotClicked(this)" style="background-color: green; border-radius: 100%; z-index: 1000; width: ${mySize}px; height: ${mySize}px; position: absolute; top: ${myY}px; left: ${myX}px; cursor: pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 223.966 223.966" //style="enable-background:new 0 0 223.966 223.966;" xml:space="preserve">
                <g>
                    <path d="M111.983,0C50.237,0,0.002,50.235,0.002,111.983c0,61.747,50.234,111.982,111.981,111.982s111.98-50.235,111.98-111.982   C223.963,50.235,173.729,0,111.983,0z M111.983,208.966c-53.475,0-96.981-43.506-96.981-96.982C15.002,58.507,58.508,15,111.983,15   s96.98,43.507,96.98,96.983C208.963,165.46,165.458,208.966,111.983,208.966z"/>
                    <path d="M111.983,41.793c-38.703,0-70.19,31.487-70.19,70.19s31.487,70.19,70.19,70.19c38.703,0,70.189-31.487,70.189-70.19   S150.686,41.793,111.983,41.793z M111.983,167.174c-30.432,0-55.19-24.758-55.19-55.19s24.758-55.19,55.19-55.19   c30.432,0,55.189,24.758,55.189,55.19S142.415,167.174,111.983,167.174z"/>
                    <path d="M111.983,79.097c-18.135,0-32.89,14.753-32.89,32.887c0,18.14,14.754,32.897,32.89,32.897   c18.133,0,32.886-14.757,32.886-32.897C144.869,93.85,130.116,79.097,111.983,79.097z M111.983,129.88   c-9.864,0-17.89-8.028-17.89-17.897c0-9.863,8.025-17.887,17.89-17.887c9.862,0,17.886,8.024,17.886,17.887   C129.869,121.852,121.845,129.88,111.983,129.88z"/>
                </g>
            </svg>
        </div>
    `
}
let id = 0
document.body.innerHTML += "<div data-target-container></div>" // Creates container for game
myContainer = document.querySelector('[data-target-container]') // sets variable to container
myContainer.innerHTML += "<div data-start-button onclick='startMyGame()' style='cursor: pointer; padding: 10px; background-color: white; text-align: center; width: 50%; color: black; border: 2px solid grey; z-index: 1100; position: fixed; left: 0; right: 0; margin-left: auto; margin-right: auto; top: 50%;'><h1>Start Game</h1></div" // Adds start button
myContainer.innerHTML += "<div style='padding: 10px; background-color: white; text-align: center; width: 50%; color: black; border: 2px solid grey; z-index: 1100; position: fixed; left: 0; right: 0; margin-left: auto; margin-right: auto; top: calc(100px + 55%);'>Click targets and have fun</div>" // Adds how to play menu
myGame = null // Establishes my game
startMyGame = function () { // Start game function
    myContainer.innerHTML = "" // Removes start button
    myGame = setInterval(() => { // Periodically adds new targets
        if(maxChildren > myChildren) { // Blocks an overload of targets to reduce the chance of crashing
            injectMe(myContainer, "iam" + id) // Creates new target
            id++ // Increments id to keep ids unique
            myChildren++ // Increase count of children
        }
    }, Math.floor(Math.random() * 50) * myTime)
}

startButton = document.querySelector('[data-start-button]')

startButton.addEventListener('mouseenter', () => {
    startButton.style.transition = "180ms"
    startButton.style.color = "white"
    startButton.style.backgroundColor = "black"
    startButton.style.borderColor = "green"
})
startButton.addEventListener('mouseleave', () => {
    startButton.style.transition = "180ms"
    startButton.style.color = "black"
    startButton.style.backgroundColor = "white"
    startButton.style.borderColor = "grey"
})

injectCounter = function (content) { // Adds the score keeper
    myContainer.innerHTML += `
    <div data-my-score style="padding: 5px; opacity: 0.5; background-color: white; color: black; border: 2px solid grey; z-index: 900; position: fixed; bottom: 30px; left: 0; right: 0; margin-left: auto; margin-right: auto; width: fit-content;">${content}</div>`
}
