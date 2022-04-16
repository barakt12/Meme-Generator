'use strict'

// Removes meme from local storage

function removeMemeFromStorage(idx) {
  const savedMemes = getSavedMemes()
  savedMemes.splice(idx, 1)
  saveToStorage(DB_KEY, savedMemes)
  renderSaved()
}

// Renders saved memes

function renderSaved() {
  const savedMemes = getSavedMemes()
  if (!savedMemes || savedMemes === null) {
    return
  }

  let strHTMLs = savedMemes.map((meme, idx) => {
    return `
    <div class="saved-img-container">
      <img class="gallery-image" src=${meme} alt="" />
      <button class="fa fa-solid fa-trash-can delete-saved-btn" onclick="removeMemeFromStorage(${idx})">
      </button>
    </div>
    `
  })
  document.querySelector('.saved .imgs-container').innerHTML = strHTMLs.join('')
}
