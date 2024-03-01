const buttons = document.querySelectorAll('.button')
const body = document.body

buttons.forEach(button => {
    button.addEventListener('click', (event)=>{
        const color = event.target.id
        body.style.backgroundColor = color
    })
})
