import './style.css'
import './dom.js'
import { displayFunction } from './dom.js'

const API_KEY = 'NXTAFBRP54Z4P5BSJNHRZ4DSJ'
displayFunction('jakarta')

async function getLoc(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}`, {mode: 'cors'})
        const responseResult =  await response.json()
        return responseResult
    } catch (error) {
        console.error(error)
    }
}

function getData(data) {
    const locData = {
        current: {
            location: data.resolvedAddress,
            icon: data.currentConditions.icon,
            conditions: data.currentConditions.conditions,
            temp: data.currentConditions.temp,
            humidity: data.currentConditions.humidity,
            uvindex: data.currentConditions.uvindex,
            windspeed: data.currentConditions.windspeed,
            visibility: data.currentConditions.visibility
        },
        daily: []
    }
    
    for (let i = 0; i < 7; i++) {
        locData.daily[i] = {
            date: data.days[i].datetime,
            icon: data.days[i].icon,
            temp: data.days[i].temp,
            windspeed: data.days[i].windspeed
        }
    }
    return locData
}

export async function setObject(city = 'jakarta') {
    const setLoc = await getLoc(city)
    const setData = getData(setLoc)
    console.log(setData)
    return setData
}