const btnMore = document.querySelector('.btn--more')
const btnLess = document.querySelector('.btn--less')
const upper = document.querySelector('.upper')
const quote = document.querySelector('.quote')
const lower = document.querySelector('.lower')

const areaCity = document.querySelector('.area__city')
const timeZone = document.querySelector('#timezone')

const toggleInfo = () => {
  upper.classList.toggle('split')
  quote.classList.toggle('split')
  btnMore.classList.toggle('hide')
  btnLess.classList.toggle('show')
  lower.classList.toggle('visible')
}

const populateWithData = (data) => {
  let { country_code, region_name, time_zone } = data

  areaCity.textContent = `${region_name}, ${country_code}`
  timeZone.textContent = time_zone
}

const getData = async () => {
  const API = 'https://freegeoip.app/json/'

  const request = await fetch(API)

  if (!request.ok) {
    throw new Error(request.status)
  } else {
    const data = await request.json()
    return data
  }
}

getData().then((data) => populateWithData(data))

btnMore.addEventListener('click', toggleInfo)
btnLess.addEventListener('click', toggleInfo)
