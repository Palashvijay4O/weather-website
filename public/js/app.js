console.log("Client side JS file loaded")

const endPointUrl = (address) => {
    document.getElementById('forecast').textContent = ''
    document.getElementById('location').style.color = 'black'
    document.getElementById('location').innerHTML = '<h3>Loading......</h3>'
    fetch('http://localhost:3000/weather?address=' + address).then((response = {}) => {
    response.json().then((data) => {
        if(!data.error) {
            document.getElementById('location').textContent = data.location
            document.getElementById('forecast').textContent = data.forecast
        }
        else {
            document.getElementById('location').textContent = data.error
            document.getElementById('location').style.color = 'red'
        }
        //console.log(data)
    })
})

}

const addressForm = document.querySelector('form')
addressForm.addEventListener('submit', submitAddress)

function submitAddress(e) {
    e.preventDefault()
    const address = document.querySelector('input[name=address]').value
    console.log(address)
    endPointUrl(address)
}