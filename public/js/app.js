const weatherForm = document.querySelector('form')
const searchBar = document.querySelector('input')
const par1 = document.querySelector('#p1')
const par2 = document.querySelector('#p2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const local = searchBar.value
    fetch('http://localhost:3000/weather?address=' + local).then((response) => {
        response.json().then((data) => {
            if(data.error){
                par1.textContent = data.error
                par2.textContent = ""
            }
            else{
                console.log(data)
                par1.textContent = data.address
                par2.textContent = data.weather
            }
        })
    })
})