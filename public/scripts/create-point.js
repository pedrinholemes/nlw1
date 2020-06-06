populateUFs()
document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)
function populateUFs(){
  const ufSelect = document.querySelector('select[name=uf]')
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(res => res.json())
    .then( states => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}
function getCities(event) {

  const citySelect = document.querySelector('select[name=city]')
  const stateInput = document.querySelector('input[name=state]')
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios?orderBy=nome`

  stateInput.value = event.target.options[event.target.selectedIndex].text

  citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`
  citySelect.disabled = true

  fetch(url)
    .then(res => res.json())
    .then( cities => {
      for (const city of cities) {
       citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      };
      citySelect.disabled = false
    })
};
const collectedItems = document.querySelector('input[name="items"]');
const itemsToColect = document.querySelectorAll('.items-grid li')
for (const item of itemsToColect) {
  item.addEventListener('click', handleSelectedItem)
}
let selectedItems = []

function handleSelectedItem(event){
  const itemLi = event.target
  const itemId = event.target.dataset.id

  itemLi.classList.toggle('selected')

  const alreadySelected = selectedItems.findIndex( item => item === itemId)
  if(alreadySelected >=0){
    const filterredItems = selectedItems.filter(item =>{
      const itemIsDiferent = item != itemId
      return itemIsDiferent
    })

    selectedItems = filterredItems
  }else{
    selectedItems.push(itemId)
  }
  collectedItems.value = selectedItems
}