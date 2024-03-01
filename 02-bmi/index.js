

const form = document.forms['bmi-form']
const result = document.getElementById('result')

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const w = parseInt(document.getElementById('weight').value)
    const h = parseInt(document.getElementById('height').value)

    if (w === "" || w < 0 || isNaN(w)){
        result.innerHTML = "please give a valid width"
    }
    if (h === "" || h < 0 || isNaN(h)){
        result.innerHTML = "please give a valid width"
    }
    const ans = (w / Math.pow(h, 2)).toFixed(2)
    result.textContent = "The BMI result is: " + ans
})
