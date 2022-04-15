'use strict'
let gCurrImg
let gIsClicked = false
const pages = ['gallery', 'editor', 'saved', 'about', 'about-info']
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function initGallery() {
  renderGallery()
  renderKeywords()
  createCanvas()
}

function renderGallery() {
  const images = getImages()
  let strHTML = `<label onchange="onImgInput(event)" class="fa fa-solid fa-upload upload-img gallery-image"><input name="uploadimg" type="file"/ ></label>`
  let imgHTML = images.map((img) => {
    return `<img onclick="onSelectImage(${img.id})" class="gallery-image" src="./images/${img.id}.jpg">`
  })
  const elContainer = document.querySelector('.imgs-container')
  elContainer.innerHTML = strHTML + imgHTML.join('')
}

function onSelectImage(id) {
  setSelectedImg(id)
  const currImg = getSelectedImg()
  const img = new Image()
  img.src = currImg.url
  img.onload = () => {
    gCurrImg = img
    initMeme(img)
  }
  moveToPage('editor')
}

function moveToPage(targetPage) {
  pages.forEach((page) => {
    document.querySelector(`.${page}`).classList.add('hidden')
  })
  document.querySelector(`.${targetPage}`).classList.remove('hidden')
}

function onDown(ev) {
  const pos = getEvPos(ev)
  const isClicked = isLineClicked(pos)
  const lines = getGMeme().lines
  if (isClicked) {
    setSelectedLine(lines.indexOf(isClicked))
    gStartPos = pos
    gIsClicked = true
    const diffX = pos.x - gStartPos.x
    const diffY = pos.y - gStartPos.y
    moveLine(diffX, diffY)
    renderMeme(gCurrImg)
    markLine(gMeme.lines[gMeme.selectedLineIdx])
    document.querySelector('.canvas-container').style.cursor = 'grabbing'
  }
}

function onMove(ev) {
  if (gIsClicked) {
    const pos = getEvPos(ev)
    const diffX = pos.x - gStartPos.x
    const diffY = pos.y - gStartPos.y
    moveLine(diffX, diffY)
    renderMeme(gCurrImg)
    markLine(gMeme.lines[gMeme.selectedLineIdx])
    gStartPos = pos
  }
}

function onUp() {
  gIsClicked = false
  document.querySelector('.canvas-container').style.cursor = 'grab'
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

function onFilterImgs(val) {
  setFilterImgs(val)
  // getImages()
  renderGallery()
}

function onToggleMenu() {
  document.querySelector('.backdrop').classList.toggle('open-menu')
  document.querySelector('.navbar').classList.toggle('open-menu')
}

function onImgInput(ev) {
  loadImageFromInput(ev, initMeme)

  moveToPage('editor')
}

function renderKeywords() {
  let keywords = getKeywords()
  let strHTMLs =
    '<button data-word="all" onclick="onFilterImgs(this.dataset.word)" style="font-size: 18px;">All</button>'
  for (let key in keywords) {
    strHTMLs += `<button class="category-selections" data-word="${key}" onclick="onFilterImgs(this.dataset.word); onSizeUpKeyword(this.dataset.word)" style="font-size: ${
      keywords[key] + 6
    }px;">${key[0].toUpperCase() + key.slice(1)}</button>`
  }
  document.querySelector('.categories').innerHTML = strHTMLs
}

function onSizeUpKeyword(word) {
  sizeUpKeyword(word)
  initGallery()
}
