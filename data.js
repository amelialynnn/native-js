/* HAMBURGER MENU */

const hamburger = document.querySelector('#hamburger'),
  navUl = document.querySelector('#nav-ul')

hamburger.addEventListener('click', () => {
  navUl.classList.toggle('show')
})

const marg = JSON.parse(localStorage.getItem('type-0'))
const mojito = JSON.parse(localStorage.getItem('type-1'))
const daiq = JSON.parse(localStorage.getItem('type-2'))

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'polarArea',
  data: {
    labels: [
      marg[0].strDrink,
      mojito[0].strDrink,
      daiq[0].strDrink
    ],
    datasets: [{
      label: 'Drinks Dataset',
      data: [
        marg.length,
        mojito.length,
        daiq.length
      ],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)'
      ]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'How many different versions of a specific drink are there on the website?'
      }
    }
  },
});
