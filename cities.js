/* HAMBURGER MENU */

const hamburger = document.querySelector('#hamburger'),
  navUl = document.querySelector('#nav-ul')

hamburger.addEventListener('click', () => {
  navUl.classList.toggle('show')
})

const inputCity = document.querySelector('#input-city'),
  inputPopulation = document.querySelector('#input-population'),
  citiesTable = document.querySelector('#cities-table'),
  addBtn = document.querySelector('#add-btn'),
  idRemove = document.querySelector('#remove-city'),
  removeBtn = document.querySelector('#remove-btn'),
  idEdit = document.querySelector('#edit-id'),
  newCity = document.querySelector('#new-city'),
  newPopulation = document.querySelector('#new-population'),
  editBtn = document.querySelector('#edit-btn')

/* BUTTONS */

addBtn.addEventListener('click', add)
removeBtn.addEventListener('click', remove)
editBtn.addEventListener('click', edit)

/* GET */

function get() {
  fetch('https://avancera.app/cities/')
  .then(function (response) { return response.json() })
  .then(function (result) {
    citiesTable.innerHTML = ''

    for (let i = 0; i < 3; i++) {
      const thArray = ['City', 'Population', 'ID']
      const tableHead = document.createElement('th')

      tableHead.textContent = thArray[i]
      citiesTable.appendChild(tableHead)
    }

    for (let n = 0; n < result.length; n++) {
      const tableRow = document.createElement('tr')
      tableRow.classList.add('city-data')
      citiesTable.appendChild(tableRow)

      const city = document.createElement('td'),
        population = document.createElement('td'),
        id = document.createElement('td')

      city.textContent = result[n].name
      population.textContent = result[n].population
      id.textContent = result[n].id

      tableRow.appendChild(city)
      tableRow.appendChild(population)
      tableRow.appendChild(id)
    }
  })
}

get()

/* POST */

function add() {
  if (inputCity.value === '' || inputPopulation.value === '') {
    alert('Please fill out both fields, i.e. city and population, to add a city to list')
    return
  }

  fetch('https://avancera.app/cities/', {
    body: JSON.stringify({ name: inputCity.value, population: Number(inputPopulation.value) }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })

  .then(response => response.json())
  .then(result => {
    console.log(result)
    inputCity.value = ''
    inputPopulation.value = ''
    get()
  })
}

/* DELETE */

function remove() {
  if (idRemove.value === '' || idRemove.value.length !== 36) {
    alert('Incorrect ID. Please try again')
    return
  }

  fetch(`https://avancera.app/cities/${idRemove.value}`, {
    method: 'DELETE'
  })

  .then(response => {
    console.log(response)
    idRemove.value = ''
    get()
  })
}

/* PATCH */

function edit() {
  const body = {}

  if (idEdit.value === '' || idEdit.value.length !== 36) {
    alert('City ID field id not correct. Please try again')
    return
  } else {
    body.id = idEdit.value
  }

  if (newCity.value !== '') {
    body.name = newCity.value
  }

  if (newPopulation.value !== '') {
    body.population = Number(newPopulation.value)
  }

  fetch(`https://avancera.app/cities/${idEdit.value}`, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH'
  })

  .then(response => {
    console.log(response)
    idEdit.value = ''
    newCity.value = ''
    newPopulation.value = ''
    get()
  })
}
