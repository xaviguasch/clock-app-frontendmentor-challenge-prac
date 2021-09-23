const btnMore = document.querySelector('.btn--more')
const btnLess = document.querySelector('.btn--less')
const upper = document.querySelector('.upper')
const quote = document.querySelector('.quote')
const lower = document.querySelector('.lower')
const wrapper = document.querySelector('.wrapper')

const quoteSentence = document.querySelector('.quote__sentence')
const quoteAuthor = document.querySelector('.quote__author')
const iconRefresh = document.querySelector('.icon--refresh')
const partOfTheDay = document.querySelector('.part-of-the-day')
const areaCity = document.querySelector('.area__city')
const timeZone = document.querySelector('#timezone')
const digits = document.querySelector('.digits')
const timezoneSpan = document.querySelector('.timezone')
const dayOfYear = document.querySelector('#day-year')
const dayOfWeek = document.querySelector('#day-week')
const weekNumber = document.querySelector('#week-number')
const iconSun = document.querySelector('.icon--sun')
const iconMoon = document.querySelector('.icon--moon')

const toggleInfo = () => {
  upper.classList.toggle('split')
  quote.classList.toggle('split')
  btnMore.classList.toggle('hide')
  btnLess.classList.toggle('show')
  lower.classList.toggle('visible')
}

const transformTimestamp = (unixtime) => {
  const date = new Date(unixtime * 1000)

  const hours = date.getHours()
  const minutes = `0${date.getMinutes()}`

  const formattedTime = `${hours}:${minutes.substr(-2)}`

  let dayPart = ''

  if (hours >= 21 && hours <= 4) {
    dayPart = 'night'
  } else if (hours >= 5 && hours <= 11) {
    dayPart = 'morning'
  } else if (hours >= 12 && hours <= 16) {
    dayPart = 'afternoon'
  } else {
    dayPart = 'evening'
  }

  return { formattedTime, dayPart }
}

const getQuote = async () => {
  const API = 'https://api.quotable.io/random'

  const request = await fetch(API)

  if (!request.ok) {
    throw new Error(request.status)
  } else {
    const quoteData = await request.json()

    return quoteData
  }
}

const populateQuote = (data) => {
  const { content, author } = data

  quoteAuthor.textContent = author
  quoteSentence.textContent = content
}

const getGeolocation = async () => {
  const API = 'https://freegeoip.app/json/'

  const request = await fetch(API)

  if (!request.ok) {
    throw new Error(request.status)
  } else {
    const geoData = await request.json()
    return { geoData }
  }
}

const getTimes = async (data) => {
  const { geoData } = data

  const API = 'http://worldtimeapi.org/api/timezone/'

  const [area, city] = geoData.time_zone.split('/')

  const request = await fetch(`${API}/${area}/${city}`)

  if (!request.ok) {
    throw new Error(request.status)
  } else {
    const timesData = await request.json()

    return { geoData, timesData }
  }
}

const SetNightmode = (type) => {
  if (type === 'on') {
    wrapper.classList.add('nighttime')
    lower.classList.add('nighttime')
  } else {
    wrapper.classList.remove('nighttime')
    lower.classList.remove('nighttime')
  }
}

const populateTimesAndGeo = (data) => {
  const { geoData, timesData } = data

  let { country_code, region_name, time_zone } = data.geoData

  areaCity.textContent = `${region_name}, ${country_code}`
  timeZone.textContent = time_zone

  let { unixtime, timezone, day_of_week, day_of_year, week_number, abbreviation } =
    data.timesData

  const { formattedTime, dayPart } = transformTimestamp(unixtime)

  digits.innerHTML = `${formattedTime}<span class="timezone">${abbreviation}</span>`

  if (dayPart === 'morning' || dayPart === 'afternoon') {
    iconSun.style.display = 'block'
    iconMoon.style.display = 'none'

    SetNightmode('off')
  } else {
    iconMoon.style.display = 'block'
    iconSun.style.display = 'none'

    SetNightmode('on')
  }
  partOfTheDay.textContent = `Good ${dayPart}`

  dayOfYear.textContent = day_of_year
  dayOfWeek.textContent = day_of_week
  weekNumber.textContent = week_number
}

const refreshQuote = () => getQuote().then((data) => populateQuote(data))

const chainOfAPIs = () => {
  getQuote().then((data) => populateQuote(data))

  getGeolocation()
    .then((data) => getTimes(data))
    .then((data) => populateTimesAndGeo(data))
}

const refreshTime = () => {
  console.log('refresh time!')
  getGeolocation()
    .then((data) => getTimes(data))
    .then((data) => populateTimesAndGeo(data))
}

chainOfAPIs()

setInterval(() => {
  refreshTime()
}, 5 * 1000)

btnMore.addEventListener('click', toggleInfo)
btnLess.addEventListener('click', toggleInfo)

iconRefresh.addEventListener('click', refreshQuote)
