const optionButtons = document.querySelectorAll('.option-button')
const advanceOptionButtons = document.querySelectorAll(".adv-option-button")
const fontName =  document.getElementById("font-name")
const fontSize =  document.getElementById("fontSize")
const writtingArea = document.getElementById('text-input')
const linkButton = document.getElementById("createLink")
const alignButtons = document.querySelectorAll(".align")
const spacingButtons = document.querySelectorAll('.spacing')
const formatButtons = document.querySelectorAll('.format')
const scriptButtons = document.querySelectorAll('.script')

// list of font list
let fontList = ['Arial', "Verdana", "Times New Roman", "Geramond", "Georgia", "Courier New", "Cursive"]

/// initial setting
const initializer = ()=>{
    // function call for highligting buttons
    // no hightlights for link, unlink, lists, undo, redo since they are one time operations
    highLighter(alignButtons, true)
    highLighter(spacingButtons, true)
    highLighter(formatButtons, false)
    highLighter(scriptButtons, true)

    //create options for font names
    fontList.map(value =>{
        let option = document.createElement("option")
        option.value = value
        option.innerHTML = value
        fontName.appendChild(option)
    })

    // fontSize allows only till 7
    for (let i = 1; i <=  7; i++){
        let option = document.createElement("option")
        option.value = i
        option.innerHTML = i
        fontSize.appendChild(option)
    }
    // default font size
    fontSize.value = 3


}
const highLighter = (className, needsRemoval)=>{
    className.forEach(button=>{
        button.addEventListener("click", ()=>{
            //needsRemoval = true means only one button should be highLight and other would be normal
            if (needsRemoval){
                let alreadyActive = false

                // if currentlyClick button is already active
                if (button.classList.contains('active')){
                    alreadyActive = true
                }

                // remove highligher from other buttons
                highLighterRemover(className)
                if (!alreadyActive){
                    console.log(alreadyActive)
                    // hightlight clicked button
                    button.classList.add("active")
                }
            } else {
                // if other buttons can be highlighted
                button.classList.toggle("active")
            }
        })
    })
}

const modifyText = (command, defaultUi, value)=>{
    console.log(command)
    document.execCommand(command, defaultUi, value)
}

// for basic operations which don't need value
optionButtons.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        modifyText(btn.id, false, null)
    })
})

advanceOptionButtons.forEach(button=>{
    
    button.addEventListener('change', ()=>{
        console.log(button.id, button.value)
        modifyText(button.id, false, button.value)
        console.log(writtingArea.innerHTML)
    })
})

window.onload = initializer()

// remove highLight from other buttons
function highLighterRemover(className){
    className.forEach(button =>{
        button.classList.remove("active")
    })
}

