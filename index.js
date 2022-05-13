// player variables
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""

let sumEl = document.getElementById("player-sum")
let cardsEl = document.getElementById("player-cards")

// computer variables
let computerCards = []
let computerSum = 0
let computerHasBlackJack = false
let computerIsAlive = false

let computerSumEl = document.getElementById("computer-sum")
let computerCardsEl = document.getElementById("computer-cards")
let passAmounts = [17,18,19,20]

// message variable
let messageEl = document.getElementById("message-el")


function getRandomCard() {
    let randomNumber = (Math.floor(Math.random() * 12) + 1)

    if (randomNumber === 1) {
        return 11
    } else if (randomNumber > 10) {
        return 10
    } else {
        return randomNumber
    }
}

function startGame() {
    document.getElementById('btn-new').style.display = "inline";
    cards = []
    sum = 0
    computerCards = []
    computerSum = 0
    computerCardsEl.textContent = "Computer kaarten: "
    computerSumEl.textContent = "Computer totaal: "
    hasBlackJack = false
    isAlive = true
    cards.push(getRandomCard())
    cards.push(getRandomCard())
    sum = cards[0] + cards[1]
    document.getElementById('btn-start').style.display = "none";
    document.getElementById('btn-pass').style.display = "inline";
    runGame()
}

function runGame() {
    cardsEl.textContent = "Uw kaarten:" 
    for(var i=0; i < cards.length; i++) 
        {cardsEl.textContent += " " + cards[i]}
    sumEl.textContent = "Uw totaal: " + sum
    if (sum <= 20) {
        message = "Wil je nog een kaart trekken?"
    } else if (sum === 21) {
        message = "Gefeliciteerd, je hebt 21!"
        hasBlackJack = true
        document.getElementById('btn-start').style.display = "inline";
        document.getElementById('btn-pass').style.display = "none";
        document.getElementById('btn-new').style.display = "none";
    } else {
        message = "Helaas, meer dan 21."
        isAlive = false
        document.getElementById('btn-start').style.display = "inline";
        document.getElementById('btn-pass').style.display = "none";
        document.getElementById('btn-new').style.display = "none";
    }
    
    messageEl.textContent = message
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        cards.push(card)
        sum += card
        runGame()
    }
}


function pass() {
    document.getElementById('btn-start').style.display = "inline";
    document.getElementById('btn-pass').style.display = "none";
    document.getElementById('btn-new').style.display = "none";

    let passAmount = passAmounts[Math.floor(Math.random() * passAmounts.length)]
    while (computerSum < passAmount) {
        let card = getRandomCard()
        computerCards.push(card)
        computerSum += card
    }
    computerCardsEl.textContent = "Computer kaarten:" 
    for(var i=0; i < computerCards.length; i++) 
        {computerCardsEl.textContent += " " + computerCards[i]}
        computerSumEl.textContent = "Computer totaal: " + computerSum

    if (computerSum < 22 && computerSum === sum) {
        messageEl.textContent = "Helaas, gelijkspel."
    } else if (computerSum < 22 && computerSum > sum) {
        messageEl.textContent = "Helaas, de computer wint."
    } else {
        messageEl.textContent = "Gefeliciteerd je hebt gewonnen!"
    }
}