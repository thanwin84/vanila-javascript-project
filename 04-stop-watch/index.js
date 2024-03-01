
const hour = document.getElementById('hour')
const minute = document.getElementById('minute')
const second = document.getElementById('second')
const startBtn = document.getElementById('start')
// const stopBtn = document.getElementById('stop')
const timeStamps = document.getElementById('timeStamps')
const btnCountainer = document.querySelector('.buttonContainer')


let timeStampTopBorder = false
let intervalId;
/// key : button element
const elements = {
    flag: "",
    restart: "",
    stop: ""
}

let seconds = 0, m = 0, h = 0
let timeStampCount = 0


function setText(element, text){
    element.textContent = text < 10 ? "0" + text : text
}

function startTimer(){
    seconds += 1
    m = Math.floor(seconds / 60)
    h = Math.floor(seconds / (60 * 60 * 60))
    s = seconds % 60
    
    setText(hour, h)
    setText(minute, m)
    setText(second, s)
    
}

// we only have start button at initial state
startBtn.addEventListener('click', handleStart)




function createBtnElement(id){
    const btn = document.createElement("button")
    btn.textContent = id
    btn.id = id
    return btn
}

function handleFlag(){
    timeStampCount += 1
    if (!timeStampTopBorder){
       
        timeStamps.classList.add('border-top')
        timeStampTopBorder = true
    }
    const p = document.createElement('p')
    p.classList.add('timeStamp')
    p.innerHTML = `<span class='timeStampCount'>${timeStampCount}</span> <span>${h} : ${m} : ${s}</span>`
    timeStamps.appendChild(p)
}
function handleRestart(){
    clearInterval(intervalId)
    intervalId = null
    seconds = 0

    setText(minute, 0)
    setText(hour, 0)
    setText(second, 0)

    // set elements object back to initial state
    Object.keys(elements).forEach(key =>{
        
        elements[key].remove()
        elements[key] = ""
    })
    
    timeStampTopBorder = false
    timeStamps.classList.remove('border-top')

    // remove all items from timeStamps container
    const btns = document.querySelectorAll('.timeStamp')
    btns.forEach(item => {
        item.remove()
    })
    
    
}

function handleStart(){
    intervalId = setInterval(startTimer, 1000)
    setText(startBtn, 'Start')
    if (!elements['flag'] && !elements['restart'] && !elements['stop']){
        const pairs = [['flag', handleFlag], ['restart', handleRestart], ['stop', handleStop]]
        pairs.forEach(pair =>{
            const [id, eventHandler] = pair
            // create button
            const btn = createBtnElement(id)
            // append button in the button container
            btnCountainer.appendChild(btn)
            elements[id] = document.getElementById(id)
            // add event listener to the button
            elements[id].addEventListener('click', eventHandler)
        })

    }
    
}
function handleStop(){
    clearInterval(intervalId)
    // start -> resume
    setText(startBtn, 'resume')
}