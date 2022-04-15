'use strict'

const DB_KEY = 'savedMemesDB'

let gStickers = ['😂', '😴', '🤡', '💩']

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      pos: {
        x: 250,
        y: 70,
      },
      txt: 'Sample text up',
      size: 40,
      align: 'center',
      fillColor: 'white',
      strokeColor: 'black',
      isSelected: true,
      fontfamily: 'impact',
    },
    {
      pos: {
        x: 250,
        y: 450,
      },
      txt: 'Sample text down',
      size: 40,
      align: 'center',
      fillColor: 'white',
      strokeColor: 'black',
      isSelected: false,
      fontfamily: 'impact',
    },
  ],
}

function getGMeme() {
  return gMeme
}

function setSelectedImg(id) {
  gMeme.selectedImgId = id
}

function getSelectedImg() {
  const imgs = getImages()
  return imgs.find((img) => img.id === gMeme.selectedImgId)
}

function moveLine(diffX, diffY) {
  gMeme.lines[gMeme.selectedLineIdx].pos.x += diffX
  gMeme.lines[gMeme.selectedLineIdx].pos.y += diffY
}

function isLineClicked(clickedPos) {
  const clickedLine = gMeme.lines.find((line) => {
    if (
      Math.sqrt(
        (clickedPos.x - line.pos.x) ** 2 + (clickedPos.y - line.pos.y) ** 2
      ) <=
      gCtx.measureText(line.txt).width / 2
    ) {
      return line
    }
  })

  return clickedLine
}

function saveMemeToStorage(meme) {
  let savedMemes = loadFromStorage(DB_KEY)
  if (!savedMemes || savedMemes === null) {
    savedMemes = [meme]
    saveToStorage(DB_KEY, savedMemes)
    return
  }
  savedMemes.push(meme)
  saveToStorage(DB_KEY, savedMemes)
}

function getSavedMemes() {
  return loadFromStorage(DB_KEY)
}

function getStickers() {
  return gStickers
}
