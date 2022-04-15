'use strict'

let gElCanvas
let gCtx
let gStartPos

function initMeme(img) {
  createCanvas()
  resizeCanvas()
  addListeners()
  renderMeme(img)
  renderStickers()
}

function createCanvas() {
  gElCanvas = document.querySelector('#meme-canvas')
  gCtx = gElCanvas.getContext('2d')
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
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

function renderMeme(img) {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  const memesObj = getGMeme()
  const lines = memesObj.lines
  lines.forEach((line) => makeLine(line))
  markLine(gMeme.lines[gMeme.selectedLineIdx])
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}

function makeLine(line) {
  gCtx.textBaseline = 'middle'
  gCtx.textAlign = line.align
  gCtx.strokeStyle = line.strokeColor
  gCtx.fillStyle = line.fillColor
  gCtx.font = `${line.size}px ${line.fontfamily}`

  gCtx.fillText(line.txt, line.pos.x, line.pos.y)
  gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}

function markLine(line) {
  const lineWidth = gCtx.measureText(line.txt).width
  const lineHeight = line.size + 30
  gCtx.strokeStyle = 'red'
  gCtx.strokeRect(
    line.pos.x - lineWidth / 2 - 10,
    line.pos.y - lineHeight / 2,
    lineWidth + 20,
    lineHeight
  )
}

function addNewLine(txt = 'New Sample') {
  resetSelectedLine()
  const line = {
    txt: txt,
    size: 40,
    align: 'center',
    fillColor: 'white',
    strokeColor: 'black',
    pos: {
      x: 250,
      y: 250,
    },
    fontfamily: 'impact',
    isSelected: true,
  }
  gMeme.lines.push(line)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
  markLine(gMeme.lines[gMeme.selectedLineIdx])
}

function deleteLine() {
  const selectedLineIdx = gMeme.selectedLineIdx
  gMeme.lines.splice(selectedLineIdx, 1)
  if (gMeme.lines.length) {
    gMeme.selectedLineIdx = selectedLineIdx - 1
    gMeme.lines[gMeme.selectedLineIdx].isSelected = true
  }
}

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
  const meme = gElCanvas.toDataURL('image/jpeg')
  saveMemeToStorage(meme)
  renderSaved()
  moveToPage('saved')
}

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
