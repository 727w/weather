import { setObject } from "."

const search = document.querySelector('#location')
const searchBtn = document.querySelector('#searchBtn')
const celciusBtn = document.querySelector('#celcius')
const fahrenheitBtn = document.querySelector('#fahrenheit')

let fahr = true

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (search.value) {
        displayFunction(search.value)
    } else return
})

fahrenheitBtn.addEventListener('click', () => {
    if (!fahr) {
        displayFahr()
        fahr = true
    }
})

celciusBtn.addEventListener('click', () => {
    if (fahr) {
        displayCelc()
        fahr = false
    }
})

const displayMainInfo = (data) => {
    const locationInfo = document.querySelector('#locationInfo')
    const weatherIcon = document.querySelector('#weatherIcon')
    const tempInfo = document.querySelector('#tempInfo')
    const conditionInfo = document.querySelector('#conditionInfo')
    const humidityInfo = document.querySelector('#humidityInfo')
    const uviInfo = document.querySelector('#uviInfo')
    const windInfo = document.querySelector('#windInfo')
    const visibilityInfo = document.querySelector('#visibilityInfo')

    locationInfo.textContent = data.current.location
    weatherIcon.src = `icon/${data.current.icon}.png`
    tempInfo.textContent = data.current.temp + '° F'
    tempInfo.classList.add('temp-info')
    conditionInfo.textContent = data.current.conditions
    humidityInfo.textContent = data.current.humidity + '%'
    uviInfo.textContent = data.current.uvindex
    windInfo.textContent = data.current.windspeed + ' km/h'
    visibilityInfo.textContent = data.current.visibility + ' km'
}

const displayDailyCondition = (data) => {
    const weeklyContainer = document.querySelector('#weeklyContainer')
    weeklyContainer.innerHTML = ''

    data.daily.forEach((daily, index) => {
        const dayDiv = document.createElement('div')
        dayDiv.classList.add('day-container')
    
        const icon = document.createElement('img')
        icon.src = `icon/${daily.icon}.png`
        icon.alt = `Weather icon for day ${index + 1}`
        
        const date = document.createElement('p')
        date.textContent = daily.date
        
        const temp = document.createElement('p')
        temp.textContent = ` ${daily.temp}° F`
        temp.classList.add('temp-info')
    
        const wind = document.createElement('p')
        wind.textContent = `${daily.windspeed} km/h`
    
        dayDiv.appendChild(icon)
        dayDiv.appendChild(date)
        dayDiv.appendChild(temp)
        dayDiv.appendChild(wind)
    
        weeklyContainer.appendChild(dayDiv)
    })
}

function setCelc(e) {
    return ((e - 32) * 5) / 9
}

const displayCelc = () => {
    const temp = document.querySelectorAll('.temp-info')
    temp.forEach((temp) => {
        const currentTemp = parseFloat(temp.textContent)
        const newTemp = setCelc(currentTemp)
        temp.textContent = `${newTemp.toFixed(1)}° C`
    })
}

function setFahr(e) {
    return (e * 9) / 5 + 32
}

const displayFahr = () => {
    const temp = document.querySelectorAll('.temp-info')
    temp.forEach((temp) => {
        const currentTemp = parseFloat(temp.textContent)
        const newTemp = setFahr(currentTemp)
        temp.textContent = `${newTemp.toFixed(1)}° F`
    })
}

export const displayFunction = async (data) => {
    try {
        const locationData = await setObject(data)
        displayMainInfo(locationData)
        displayDailyCondition(locationData)
    } catch (error) {
        console.error(error)
    }
}