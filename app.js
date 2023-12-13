const form = document.querySelector('.form')
const recipes = document.querySelector('.recipes')

const APP_ID = 'b02f6fc3'  // Refer Readme.md
const APP_KEY = '6b5a3fe3af20c15f1e8e3f25d7f4f8a6' // Refer Readme.md


let inputValue = 'chicken'

const fetchData = async (query) => {
  const response = await fetch(
    `https://api.edamam.com/api/recipes/v2?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&type=public`
  )

  const data = await response.json()
  console.log(data)
  runAPIScripts(data.hits)
}

const runAPIScripts = (data) => {
  recipes.innerHTML = ''
  data.map((recipe) => {
    generateDOM(recipe.recipe)
  })
}

const generateDOM = (recipe) => {
  const wrapper = document.createElement('div')

  const title = document.createElement('h1')
  title.textContent = recipe.label

  const calories = document.createElement('p')
  calories.textContent = `${Math.floor(recipe.calories)} calories`

  const listContainer = document.createElement('ul')

  recipe.ingredientLines.forEach((ingredient) => {
    const listItem = document.createElement('ol')
    listItem.textContent = ingredient
    listContainer.appendChild(listItem)
  })

  const image = document.createElement('img')
  image.setAttribute('src', recipe.image)
  image.classList.add('img')

  wrapper.appendChild(title)
  wrapper.appendChild(calories)
  wrapper.appendChild(listContainer)
  wrapper.appendChild(image)

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
