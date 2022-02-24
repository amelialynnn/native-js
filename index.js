/* HAMBURGER MENU */

const hamburger = document.querySelector('#hamburger'),
  navUl = document.querySelector('#nav-ul')

hamburger.addEventListener('click', () => {
  navUl.classList.toggle('show')
})

/* SEARCH */

const filter = document.querySelector('#filter'),
  searchBtn = document.querySelector('#search-btn')

filter.addEventListener('keydown', handler)
searchBtn.addEventListener('click', handler)

function handler(event) {
  if (event.code === 'Enter' || event.type === 'click') {
    search()
  }
}

function search() {
  const filteredResult = document.querySelector('#filtered-drinks')

  while(filteredResult.firstChild) {
    filteredResult.removeChild(filteredResult.firstChild)
  }

  hide()

  const siteSearch = document.querySelector('#site-search')
  siteSearch.style.display = 'block'

  const resultSearch = document.querySelector('#result-search')
  resultSearch.style.display = 'block'

  const filtred = filter.value

  searchDrinks(filtred)

  async function searchDrinks() {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filtred}`

    const response = await fetch(url)
    const result = await response.json()

    for (let n = 0; n < result.drinks.length; n++) {
      const filteredDrinks = document.querySelector('#filtered-drinks')

      const li = document.createElement('li'),
        img = document.createElement('img'),
        drinkName = document.createElement('span'),
        a = document.createElement('a')

      a.setAttribute('href', 'javascript:void(0)')
      a.setAttribute('id', 'ID' + result.drinks[n].idDrink)
      li.appendChild(a)

      img.setAttribute('src', result.drinks[n].strDrinkThumb)
      a.appendChild(img)

      drinkName.textContent = result.drinks[n].strDrink
      a.appendChild(drinkName)

      filteredDrinks.appendChild(li)
    }
  }
}

/* POPULAR DRINKS */

async function popularDrinks() {
  const name = ['margarita', 'mojito', 'daiquiri']

  for (let n = 0; n < name.length; n++) {
    const drink = name[n]
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`

    const responseDrink = await fetch(url)
    const result = await responseDrink.json()

    const popularDrinks = document.querySelector('#popular-drinks')

    const li = document.createElement('li'),
      a = document.createElement('a'),
      img = document.createElement('img'),
      drinkName = document.createElement('span')

    li.setAttribute('class', 'pop-drink')

    a.setAttribute('href', 'javascript:void(0)')
    a.setAttribute('id', result.drinks[0].strDrink)
    li.appendChild(a)

    img.setAttribute('src', result.drinks[0].strDrinkThumb)
    a.appendChild(img)

    drinkName.textContent = result.drinks[0].strDrink
    a.appendChild(drinkName)

    popularDrinks.appendChild(li)

    const drinkStorage = result.drinks
    localStorage.setItem('type-' + n, JSON.stringify(drinkStorage))
  }
}

popularDrinks()

/* RANDOM DRINKS */

async function randomDrinks() {
  for (let n = 0; n < 10; n++) {
    const responseDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    const result = await responseDrink.json()

    const randomDrinks = document.querySelector('#random-drinks')

    const li = document.createElement('li'),
      a = document.createElement('a'),
      img = document.createElement('img'),
      drinkName = document.createElement('span')

    li.setAttribute('class', 'random-drink')

    a.setAttribute('href', 'javascript:void(0)')
    a.setAttribute('id', 'ID' + result.drinks[0].idDrink)
    li.appendChild(a)

    img.setAttribute('src', result.drinks[0].strDrinkThumb)
    a.appendChild(img)

    drinkName.textContent = result.drinks[0].strDrink
    a.appendChild(drinkName)

    randomDrinks.appendChild(li)
  }
}

randomDrinks()

/* HIDE */

function hide() {
  const siteSearch = document.querySelector('#site-search'),
    sectionPopular = document.querySelector('#section-popular'),
    pictureElement = document.querySelector('picture'),
    sectionRandom = document.querySelector('#section-random'),
    resultSearch = document.querySelector('#result-search')


  siteSearch.style.display = 'none'
  sectionPopular.style.display = 'none'
  pictureElement.style.display = 'none'
  sectionRandom.style.display = 'none'
  resultSearch.style.display = 'none'
}

/* CLICK */

addEventListener('click', onClick)

async function onClick(findId) {
  let targetId = findId.srcElement.parentElement.id
  console.log(targetId)

  async function recipe () {
    const sectionRecipe = document.querySelector('#section-recipe')
    sectionRecipe.style.display ='block'

    targetId = targetId.slice(2)

    const responseDrink = await fetch ('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + targetId)
    const result = await responseDrink.json()

    const drinkName = document.querySelector('#str-drink')
    drinkName.textContent = result.drinks[0].strDrink

    const img = document.querySelector('#str-img')
    img.setAttribute('src', result.drinks[0].strDrinkThumb)

    const drinkKeys = result.drinks[0]
    const ingredientKeys = Object.keys(drinkKeys).filter(k => k.startsWith('strIngredient'))
    let ingredientAmount

    // loop for ingredients
    for (let n = 0; n < ingredientKeys.length; n++) {
      if (drinkKeys[`strIngredient${n + 1}`] !== null && drinkKeys[`strMeasure${n + 1}`] !== null) {
        ingredientAmount = drinkKeys[`strMeasure${n + 1}`] + ` ` + drinkKeys[`strIngredient${n + 1}`]

        const recipe = document.querySelector('#recipe')
        const ingredients = document.createElement('li')
        ingredients.textContent = ingredientAmount
        recipe.appendChild(ingredients)

      } else if (drinkKeys[`strIngredient${n + 1}`] !== null && drinkKeys[`strMeasure${n + 1}`] === null) {
          ingredientAmount = drinkKeys[`strIngredient${n + 1}`]

          const recipe = document.querySelector('#recipe')
          const ingredients = document.createElement('p')
          ingredients.textContent = ingredientAmount
          recipe.appendChild(ingredients)
        }
      }

    const instructions = document.querySelector('#instructions')
    const instructionsText = document.createElement('p')
    instructionsText.textContent = result.drinks[0].strInstructions
    instructions.appendChild(instructionsText)
  }

  if (targetId === 'Margarita' || targetId === 'Mojito' || targetId === 'Daiquiri') {
  //click generates different types of the same drink (not recipe)

    hide()

    const sectionType = document.querySelector('#section-type')
    sectionType.style.display = 'block'

    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${targetId}`

    const responseDrink = await fetch(url)
    const result = await responseDrink.json()

    const typeTitle = document.querySelector('#type-title')
    typeTitle.textContent = 'Choose your favorite ' + result.drinks[0].strDrink

    for (let n = 0; n < result.drinks.length; n++) {
      const typeDrinks = document.querySelector('#type-drinks')

      const li = document.createElement('li'),
        a = document.createElement('a'),
        img = document.createElement('img'),
        drinkName = document.createElement('span')

      li.setAttribute('class','drink-type')

      a.setAttribute('href', 'javascript:void(0)')
      a.setAttribute('id', 'ID' + result.drinks[n].idDrink)
      li.appendChild(a)

      img.setAttribute('src', result.drinks[n].strDrinkThumb)
      a.appendChild(img)

      drinkName.textContent = result.drinks[n].strDrink
      a.appendChild(drinkName)

      typeDrinks.appendChild(li)
    }

  } else if (targetId.startsWith('ID')) {
    hide()

    const sectionType = document.querySelector('#section-type')
    sectionType.style.display = 'none'

    recipe()
  }
}
