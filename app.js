const form = document.querySelector('.form')
const recipes = document.querySelector('.recipes')
const container = document.querySelector('.container')

const APP_ID = 'f10a0ce8'  // Refer Readme.md
const APP_KEY = '5fe2da1c593bbeccac9e38182eacf4cc' // Refer Readme.md

let inputValue = 'chicken'

const fetchData = async (query) => {
  const response = await fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
  )

  const data = await response.json()
  console.log(data)
  if (data.count == 0) {
    recipes.innerHTML = ''
    const notFound = document.createElement('p');
    notFound.textContent = `No Recipe for "${inputValue}" Found In Database`
    container.appendChild(notFound)
  } else{
    runAPIScripts(data.hits)
  }
}

const runAPIScripts = (data) => {
  recipes.innerHTML = ''
  data.map((recipe) => {
    generateDOM(recipe.recipe)
  })
}

const generateDOM = (recipe) => {
  const wrapper = document.createElement('div')

  const horizontal = document.createElement('div')
  horizontal.setAttribute('class','hori')
  const wrapper1 = document.createElement('div')
  wrapper1.setAttribute('class','leftWrapper')
  const wrapper2 = document.createElement('div')
  wrapper2.setAttribute('class','rightWrapper')

  const title = document.createElement('h1')
  title.textContent = recipe.label

  const calories = document.createElement('p')
  calories.textContent = `${Math.floor(recipe.calories)} calories`

  const servings = document.createElement('p')
  servings.textContent = `${recipe.yield} servings`

  const ingredientLabel = document.createElement('h3')
  ingredientLabel.textContent = 'Ingredients'

  const listContainer = document.createElement('ul')

  recipe.ingredientLines.forEach((ingredient) => {
    const listItem = document.createElement('li')
    listItem.textContent = ingredient
    listContainer.appendChild(listItem)
  })

  const instLabel = document.createElement('h3')
  instLabel.textContent = 'Instruction'

  const instContainer = document.createElement('ol')

  recipe.instructionLines.forEach((instruction) => {
    const inst = document.createElement('li')
    inst.textContent = instruction
    instContainer.appendChild(inst)
  })

  const image = document.createElement('img')
  image.setAttribute('src', recipe.image)
  image.classList.add('img')

  wrapper1.appendChild(title)
  wrapper1.appendChild(calories)
  wrapper1.appendChild(servings)
  wrapper1.appendChild(image)
  horizontal.appendChild(wrapper1)
  wrapper2.appendChild(ingredientLabel)
  wrapper2.appendChild(listContainer)
  horizontal.appendChild(wrapper2)
  wrapper.appendChild(horizontal)
  if (instContainer.textContent != "") {
    wrapper.appendChild(instLabel)
    wrapper.appendChild(instContainer)
  }
  wrapper.classList.add('recipe')

  recipes.appendChild(wrapper)
}

fetchData(inputValue) // Initially Load values to the Screen!!

form.addEventListener('submit', (e) => {
  e.preventDefault()

  inputValue = e.target.searchInput.value
  fetchData(inputValue)
  e.target.searchInput.value = ''
})