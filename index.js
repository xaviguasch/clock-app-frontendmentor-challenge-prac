const btnMore = document.querySelector('.btn--more')
const btnLess = document.querySelector('.btn--less')
const upper = document.querySelector('.upper')
const quote = document.querySelector('.quote')
const lower = document.querySelector('.lower')

const areaCity = document.querySelector('.area__city')
const timeZone = document.querySelector('#timezone')
const digits = document.querySelector('.digits')
const timezoneSpan = document.querySelector('.timezone')
const dayOfYear = document.querySelector('#day-year')
const dayOfWeek = document.querySelector('#day-week')
const weekNumber = document.querySelector('#week-number')

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

  return formattedTime
}

const populateWithData = (data) => {
  console.log(data)

  let { country_code, region_name, time_zone } = data.geoData
  let { unixtime, timezone, day_of_week, day_of_year, week_number, abbreviation } =
    data.timesData

  const formattedTime = transformTimestamp(unixtime)

  digits.innerHTML = `${formattedTime}<span class="timezone">${abbreviation}</span>`

  areaCity.textContent = `${region_name}, ${country_code}`
  timeZone.textContent = time_zone
  dayOfYear.textContent = day_of_year
  dayOfWeek.textContent = day_of_week
  weekNumber.textContent = week_number
}

const getGeolocation = async () => {
  const API = 'https://freegeoip.app/json/'

  const request = await fetch(API)

  if (!request.ok) {
    throw new Error(request.status)
  } else {
    const data = await request.json()
    return data
  }
}

const getTimes = async (geoData) => {
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

getGeolocation()
  .then((data) => getTimes(data))
  .then((data) => populateWithData(data))

btnMore.addEventListener('click', toggleInfo)
btnLess.addEventListener('click', toggleInfo)
