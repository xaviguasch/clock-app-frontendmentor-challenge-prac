const btnMore = document.querySelector('.btn--more')
const btnLess = document.querySelector('.btn--less')
const upper = document.querySelector('.upper')
const quote = document.querySelector('.quote')
const lower = document.querySelector('.lower')

const toggleInfo = () => {
  upper.classList.toggle('split')
  quote.classList.toggle('split')
  btnMore.classList.toggle('hide')
  btnLess.classList.toggle('show')
  lower.classList.toggle('visible')
}

btnMore.addEventListener('click', toggleInfo)
btnLess.addEventListener('click', toggleInfo)
