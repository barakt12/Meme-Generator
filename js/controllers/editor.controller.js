'use strict'

let gElCanvas
let gCtx
let gStartPos

// Editor initalization
function initMeme(img) {
  resetSelectedLine()
  setSelectedLine(0)
  createCanvas()
  resizeCanvas()
  addListeners()
  renderMeme(img)
  renderStickers()
}

// Creates canvas and access to its context
function createCanvas() {
  gElCanvas = document.querySelector('#meme-canvas')
  gCtx = gElCanvas.getContext('2d')
}

function initLinePositions() {
  const meme = getGMeme()
  meme.lines[0].pos = {
    x: gElCanvas.width / 2,
    y: 50,
  }
  meme.lines[1].pos = {
    x: gElCanvas.width / 2,
    y: gElCanvas.height - 50,
  }
}

// Adds Listeners
function addListeners() {
  addMouseListeners()
  addTouchListeners()
  // Resizes the canvas and renders it as window size changes
  window.addEventListener('resize', () => {
    resizeCanvas()
    renderMeme(gCurrImg)
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchend', onUp)
}

// Renders meme on canvas
function renderMeme(img) {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  const memeObj = getGMeme()
  initLinePositions()
  const lines = memeObj.lines
  lines.forEach((line) => makeLine(line))
  markLine(gMeme.lines[gMeme.selectedLineIdx])
}

// Resizes canvas
function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}

// Renders text input from text box

function onSetText(text) {
  setLineText(text)
  renderMeme(gCurrImg)
}

function onSwitchLine() {
  updateSelectedLine()
  renderMeme(gCurrImg)
}

function onChangeTextSize(val) {
  setTextSize(val)
  renderMeme(gCurrImg)
}

function onChangeTextAlignment(val) {
  setTextAlignment(val)
  renderMeme(gCurrImg)
}

function onAddLine() {
  addNewLine()
  renderMeme(gCurrImg)
}

function onDeleteLine() {
  deleteLine()
  renderMeme(gCurrImg)
}

function onChangeStrokeColor(val) {
  changeStrokeColor(val)
  gCtx.strokeStyle = val
  renderMeme(gCurrImg)
}

function onChangeFillColor(val) {
  changeFillColor(val)
  renderMeme(gCurrImg)
}

function onChangeTextFont(val) {
  changeTextFont(val)
  renderMeme(gCurrImg)
}

function onDownload(ellink) {
  downloadMeme(ellink)
}

function onShare(ellink) {
  uploadImg(ellink)
}

function onSave() {
  resetSelectedLine(true)
  renderMeme(gCurrImg)
  const meme = gElCanvas.toDataURL('image/jpeg')
  saveMemeToStorage(meme)
  renderSaved()
  moveToPage('saved')
}

// Renders stickers

function renderStickers() {
  const stickers = getStickers()
  const strHTMLs = stickers.map((sticker) => {
    return `<button class="sticker" onclick="onChooseSticker('${sticker}')">${sticker}</button>`
  })
  document.querySelector('.stickers-container').innerHTML = strHTMLs.join('')
}

function onChooseSticker(sticker) {
  addNewLine(sticker)
  renderMeme(gCurrImg)
}
