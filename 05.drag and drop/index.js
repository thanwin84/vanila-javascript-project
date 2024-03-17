// const draggables = document.querySelectorAll('.draggable')
// const containers = document.querySelectorAll('.container')

// draggables.forEach(dragabble =>{
//     dragabble.addEventListener('dragstart', ()=>{
//         dragabble.classList.add('dragging')
//     })
//     dragabble.addEventListener('dragend', ()=>{
//         dragabble.classList.remove('dragging')
//     })
// })

// containers.forEach(container =>{
//     container.addEventListener('dragover', (event)=>{
//         event.preventDefault()
//         console.log(event.target, event.clientY)
//         const afterElement = getDragAfterElement(container, event.clientY)
//         const draggable = document.querySelector('.dragging')
//         container.appendChild(draggable)
//     })
// })

// function getDragAfterElement(container, y){
//     const draggableElements = Array.from(container.querySelectorAll('.draggable:not(.dragging)'))
//     draggableElements.reduce((closest, current)=>{
//          const box = current.getBoundingClientRect()
//          console.log(current, box)
//     }, Number.POSITIVE_INFINITY)


// }