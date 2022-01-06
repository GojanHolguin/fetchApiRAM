const URL = "https://rickandmortyapi.com/api/character/?page=3"
const mainCard = document.querySelector('#main')
const cards = document.getElementById('card')
const templateCard = document.getElementById('template-cards').content
const changeCharacters = document.getElementById('change-characters')
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', ()=>{
    FetchApi()
})

function showCards(array1){

    if (changeCharacters.value == 'all') {

        cards.innerHTML = ''
        array1.forEach(arrayResults => {
            templateCard.querySelector('#title-card').textContent = arrayResults.name
            templateCard.querySelector('#p-card-gender').textContent = arrayResults.gender
            templateCard.querySelector('#p-card-status').textContent = arrayResults.status
            templateCard.querySelector('#img-card').src = arrayResults.image

            const clone = templateCard.cloneNode(true)
            fragment.appendChild(clone)

            cards.appendChild(fragment)
        })

    } else {

        cards.innerHTML = ''
        const array2 = array1.filter(arrayC => arrayC.name === changeCharacters.value)
        templateCard.querySelector('#title-card').textContent = array2[0].name
        templateCard.querySelector('#p-card-gender').textContent = array2[0].gender
        templateCard.querySelector('#p-card-status').textContent = array2[0].status
        templateCard.querySelector('#img-card').src = array2[0].image
    
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    
        cards.appendChild(fragment)

    }

}

const SelectOption = array1 => {

    array1.forEach(data => {
        const option = document.createElement('option')
        option.setAttribute('value', data.name)
        option.textContent = data.name
        fragment.appendChild(option)
    })

    changeCharacters.appendChild(fragment)
    showCards(array1)
    changeCharacters.addEventListener('change', function (){
        showCards(array1)
    })
    
}

function FetchApi() {

    fetch(URL)
    .then(response => response.json())
    .then(characters => {
        cards.innerHTML = ''
        const arrayCharacters = characters.results
        SelectOption(arrayCharacters)
    })

}