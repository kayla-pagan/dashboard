fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
		document.getElementById("author").textContent = `By: Dodi Achmad`
    })

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `
        document.getElementById('crypto-data').innerHTML = `
        <div>
            <i class="fa-solid fa-bullseye" style="color: #ffffff;"></i>
            <p>$${data.market_data.current_price.usd}</p>
        </div>
        <div>
            <i class="fa-solid fa-chevron-up" style="color: #ffffff;"></i>
            <p>$${data.market_data.high_24h.usd}</p>
        </div>
        <div>
            <i class="fa-solid fa-chevron-down" style="color: #ffffff;"></i>
            <p>$${data.market_data.low_24h.usd}</p>
        </div>`
    })
    .catch(err => console.error(err))

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            document.getElementById('icon-and-degree').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <h3>${data.main.temp.toFixed(0)}°</h3>`
            
            document.getElementById('location').innerHTML = data.name
        })
        .catch(err => console.error(err))
})