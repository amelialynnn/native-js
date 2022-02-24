/* HAMBURGER MENU */

const hamburger = document.querySelector('#hamburger'),
  navUl = document.querySelector('#nav-ul')

hamburger.addEventListener('click', () => {
  navUl.classList.toggle('show')
})

/* DRINKS PAGE */

async function pageDrinks() {
  for (let n = 0; n < 20; n++) {
    const responseDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    const result = await responseDrink.json()

    const randomDrinks = document.querySelector('#favorite-drinks')

    const li = document.createElement('li'),
      a = document.createElement('a'),
      img = document.createElement('img'),
      drinkName = document.createElement('span')

    li.setAttribute('class', 'favorite-drink')

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

pageDrinks()

/* CLICK */

addEventListener('click', onClick)

async function onClick(findId) {
  let targetId = findId.srcElement.parentElement.id
  console.log(targetId)

  let targetClass = findId.srcElement.parentElement.className
  console.log(targetClass)

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

  if (targetId.startsWith('ID')) {
    const sectionRandom = document.querySelector('#section-favorite')
    sectionRandom.style.display = 'none'

    recipe()
  }
}
