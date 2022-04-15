'use strict'

function removeMemeFromStorage(idx) {
  const memes = getSavedMemes()
  memes.splice(idx, 1)
  saveToStorage(DB_KEY, memes)
  renderSaved()
}

function renderSaved() {
  const memes = getSavedMemes()
  if (!memes || memes === null) {
    return
  }

  let strHTMLs = memes.map((meme, idx) => {
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
