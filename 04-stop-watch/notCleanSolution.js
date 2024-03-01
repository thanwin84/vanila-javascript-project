
const hour = document.getElementById('hour')
const minute = document.getElementById('minute')
const second = document.getElementById('second')
const startBtn = document.getElementById('start')
// const stopBtn = document.getElementById('stop')
const timeStamps = document.getElementById('timeStamps')
const btnCountainer = document.querySelector('.buttonContainer')

// let flagElement =  ""
// let restartElement = ""
let firstTopBorder = false
// let stopElement = ""
const elements = {
    flagElement: "",
    restartElement: "",
    stopElement: ""
}
let seconds = 0
let m = 0
let h = 0
let s = 0
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
let intervalId;
startBtn.addEventListener('click', handleStart)




function createBtnElement(element, id){
    const btn = document.createElement(element)
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

    // set everything to initial state
    // flagElement.remove()
    // restartElement.remove()
    // stopElement.remove()

    // elements[flagElement].remove()
    // elements[restartElement].remove()
    // elements[stopElement].remove()
    
    // elements[flagElement] = ""
    // elements[restartElement] = ""
    // elements[stopElement] = ""

    ['flagElement', "restartElement", "stopElement"].forEach(key =>{
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
    if (!flagElement && !restartElement && !stopElement){
        const pairs = [['flag', handleFlag], ['restart', handleRestart], ['stop', handleStop]]
        pairs.forEach(pair =>{
            const [id, eventHandler] = pair
            const btn = createBtnElement('button', id)
            btnCountainer.appendChild(btn)
            const element = document.getElementById(id)

            
            if (id === 'restart'){
                restartElement = element
                restartElement.addEventListener('click', handleRestart)
            }
            if (id === 'stop'){
                stopElement= element
                stopElement.addEventListener('click', handleStop)
            }
            if (id === 'flag'){
                flagElement = element
                flagElement.addEventListener('click', handleFlag)
            }

        })

    }
    
}
function handleStop(){
    clearInterval(intervalId)
    // start -> resume
    setText(startBtn, 'resume')
}