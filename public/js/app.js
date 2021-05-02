console.log("This is js inside js dir inside public")

// fetch('http://localhost:3000/weather?address=mumbai').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//         return console.log(data.error)
//         }
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const locationForm = document.querySelector('input')
const msgOne = document.querySelector("#msg1")
const msgTwo = document.querySelector("#msg2")

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const area = locationForm.value

    // console.log(area)

    msgOne.textContent = "Loading"
    msgTwo.textContent = ""

    fetch('http://localhost:3000/weather?address='+ area).then((response) => {
    response.json().then((data) => {
        if(data.Error){
        // return console.log(data.error)
      return msgOne.textContent = data.Error
        }
        // console.log(data)
        msgOne.textContent = data.location
        msgTwo.textContent = data.forecast
    })
})
})