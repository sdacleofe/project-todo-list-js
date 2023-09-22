const addForm = document.querySelector('.add')
const list = document.querySelector('.todos')
const search = document.querySelector('.search input')
const content = document.createElement('span')
const charactersLeft = document.querySelector('.characters-left')
const warningMessage = document.querySelector('.characters-counter')
const maxLength = 30

const generateList = (todo) => {
  const html = `
    <li>
        <span>${todo}</span>
        <i class="fa-solid fa-xmark delete"></i>
    </li>
    `

  list.innerHTML += html
}

// display empty list message
function checkListItems() {
  const element = document.getElementById('message')
  if (list.childElementCount === 0) {
    element.style.display = 'flex'
  } else {
    element.style.display = 'none'
  }
}

const observer = new MutationObserver(checkListItems)
observer.observe(document.body, { childList: true })

// add todos
addForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const todo = addForm.add.value.trim()

  if (todo.length && todo.length <= maxLength) {
    generateList(todo)
    addForm.reset()
    checkListItems()
  }
})

// delete todos
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove()
    checkListItems()
  }
})

// count characters
addForm.addEventListener('input', () => {
  const currLength = addForm.add.value.length
  const remainingCharacters = maxLength - currLength
  charactersLeft.textContent = remainingCharacters

  if (remainingCharacters < 0) {
    warningMessage.style.color = 'red'
  } else {
    warningMessage.style.color = 'black'
  }

  console.log(remainingCharacters)
})

// key events

const filterTodos = (term) => {
  // add filtered class
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'))

  // remove filtered class
  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'))
}

search.addEventListener('keyup', () => {
  const term = search.value.trim().toLowerCase()
  filterTodos(term)
})
