const formElement = document.forms['myForm']
const prevGuessElement = document.querySelector('#prevGuess')
const remainingGuessElement = document.querySelector('#remainingGuess')
const submitButtonElement = document.querySelector('button')


let preValue="Take the first guess";
EditElement(preValue, preValue)
let guesses = 5

formElement.addEventListener('submit', (event)=>{
    event.preventDefault()
    
    const randomNumber = Math.floor(Math.random() * 10 + 1)
    EditElement(prevGuessElement, preValue)
    const currentValue = document.getElementById('guessNumber').value
    
    if (currentValue !== ""){
        guesses -= 1
        preValue = currentValue
        EditElement(remainingGuessElement, guesses)
        
        if (randomNumber === Number(currentValue)){
            displayMessage('you have won', "success")
            submitButtonElement.disabled = true
            setTimeout(()=>{
                document.getElementById('message').remove()
                submitButtonElement.disabled = false
            }, 3000)
        }
        if (guesses === 0){
            displayMessage("Bad luck, You'v lost", 'failed')
            submitButtonElement.disabled = true
            setTimeout(()=>{
                guesses = 5
                submitButtonElement.disabled = false
                EditElement(remainingGuessElement, guesses)
                document.getElementById('message').remove()
            }, 2000)
        }
    }

    
})

function displayMessage(message, type){
    const styles = {
        success: 'green',
        failed: "red"
    }
    const container = document.getElementById('container')
    const h4 = document.createElement('h4')
    h4.appendChild(document.createTextNode(message))
    h4.classList.add(styles[type])
    h4.id = "message"
    h4.style.color = styles[type]
    container.appendChild(h4)
}

function EditElement(element, content){
    element.textContent = content
}

