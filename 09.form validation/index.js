const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')



function showError(input, message){
     const formControl = input.parentElement;
     formControl.classList.add("error")
     const small = formControl.querySelector('small')
     small.textContent = message
     
}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.classList.add("success")
}

function isValidEmail(email){
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = email.value.trim().toLowerCase().match(regex)
    
    if (!valid){
        showError(email, "Email is not valid")
    }
    else {
        removeClass(email, "error")
    }
}
function checkRequired(inputArr){
    inputArr.forEach(input =>{
        if (input.value.trim() === ""){
            showError(input, `${input.id.slice(0, 1).toUpperCase()+input.id.slice(1)} is required`)
        }else {
            showSuccess(input)
        }
    })
}

function checkLength(input, min, max){
    console.log(input.value)
    const inputLen = input.value.trim().length
    if (min && inputLen < min){
       
        showError(input, `${input.id} must be at least ${min} characters long`)
    }
    else if (max && inputLen > max){
        
        showError(input, `${input.id} can not be greater than ${max}`)
    } else {
        showSuccess(input)
        removeClass(input, "error")
    }
}

function removeClass(input, className){
    input.parentElement.classList.remove(className)
}
function checkPasswordMatch(password, password2){
    const p1 = password.value.trim()
    const p2 = password2.value.trim()
    console.log(p1, p2)
    if (p1 !== p2){
        showError(password2, "password do not match")
    } else if (p1 === p2){
        // remove error class if exists
        removeClass(password2, "error")
        showSuccess(password2)

    }
}


form.addEventListener('submit', function(e){
    e.preventDefault()
    checkRequired([username, email,password, password2])
    checkLength(username, 3, 15)
    checkLength(password, 6)
    checkPasswordMatch(password, password2)
    isValidEmail(email)
})