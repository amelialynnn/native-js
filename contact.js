/* HAMBURGER MENU */

const hamburger = document.querySelector('#hamburger'),
  navUl = document.querySelector('#nav-ul')

hamburger.addEventListener('click', () => {
  navUl.classList.toggle('show')
})

const firstName = document.querySelector('#first-name'),
  lastName = document.querySelector('#last-name'),
  eMail = document.querySelector('#e-mail'),
  message = document.querySelector('#textarea')

localStorage.setItem('firstName', firstName.value)
localStorage.setItem('lastName', lastName.value)
localStorage.setItem('eMail', eMail.value)
localStorage.setItem('message', message.value)
