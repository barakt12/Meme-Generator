'use strict'

const DB_KEY = 'savedMemesDB'
const gCanvas = document.querySelector('#meme-canvas')

let gStickers = ['😂', '😴', '🤡', '💩']

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      pos: {
        x: 0,
        y: 0,
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
        x: 0,
        y: 0,
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

function setLineText(text) {
  gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function getSelectedLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function setSelectedLine(idx) {
  resetSelectedLine()
  gMeme.lines[idx].isSelected = true
  gMeme.selectedLineIdx = idx
}

function updateSelectedLine() {
  if (gMeme.selectedLineIdx >= 0) {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
      gMeme.lines[gMeme.selectedLineIdx].isSelected = false
      gMeme.selectedLineIdx = 0
      gMeme.lines[gMeme.selectedLineIdx].isSelected = true
    } else {
      gMeme.lines[gMeme.selectedLineIdx].isSelected = false
      gMeme.selectedLineIdx++
      gMeme.lines[gMeme.selectedLineIdx].isSelected = true
    }
  } else {
    gMeme.selectedLineIdx = 0
    gMeme.lines[0].isSelected = true
  }
}

function resetSelectedLine() {
  gMeme.lines.forEach((_, idx) => {
    gMeme.lines[idx].isSelected = false
  })
  gMeme.selectedLineIdx = -1
}

function setTextSize(val) {
  if (!gMeme.selectedLineIdx >= 0) return
  gMeme.lines[gMeme.selectedLineIdx].size += val
}

function setTextAlignment(val) {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  if (val === 'end') {
    line.pos.x = gElCanvas.width - gElCanvas.width / 3
  } else if (val === 'start') {
    line.pos.x = gElCanvas.width / 3
  } else if (val === 'center') {
    line.pos.x = gElCanvas.width / 2
  }
}

function changeStrokeColor(val) {
  if (!gMeme.selectedLineIdx >= 0) return
  gMeme.lines[gMeme.selectedLineIdx].strokeColor = val
}

function changeFillColor(val) {
  if (!gMeme.selectedLineIdx >= 0) return
  gMeme.lines[gMeme.selectedLineIdx].fillColor = val
}

function changeTextFont(val) {
  if (!gMeme.selectedLineIdx >= 0) return
  gMeme.lines[gMeme.selectedLineIdx].fontfamily = val
}

// Makes the text line
function makeLine(line) {
  gCtx.textBaseline = 'middle'
  gCtx.textAlign = line.align
  gCtx.strokeStyle = line.strokeColor
  gCtx.fillStyle = line.fillColor
  gCtx.font = `${line.size}px ${line.fontfamily}`

  gCtx.fillText(line.txt, line.pos.x, line.pos.y)
  gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}

// Marks the text line while selected
function markLine(line) {
  if (!line) return
  const lineWidth = gCtx.measureText(line.txt).width + line.size
  const lineHeight = line.size + 30
  gCtx.strokeStyle = 'yellow'
  gCtx.strokeRect(
    line.pos.x - lineWidth / 2 - 10,
    line.pos.y - lineHeight / 2,
    lineWidth + 20,
    lineHeight
  )
}

// Adds line to the center

function addNewLine(txt = 'New Sample') {
  resetSelectedLine()
  const line = {
    txt: txt,
    size: 40,
    align: 'center',
    fillColor: 'white',
    strokeColor: 'black',
    pos: {
      x: gElCanvas.width / 2,
      y: gElCanvas.height / 2,
    },
    fontfamily: 'impact',
    isSelected: true,
  }
  gMeme.lines.push(line)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
  markLine(gMeme.lines[gMeme.selectedLineIdx])
}

// Deletes line

function deleteLine() {
  const selectedLineIdx = gMeme.selectedLineIdx
  if (selectedLineIdx >= 0) {
    gMeme.lines.splice(selectedLineIdx, 1)
    if (gMeme.lines.length) {
      gMeme.selectedLineIdx = selectedLineIdx - 1
      gMeme.lines[gMeme.selectedLineIdx].isSelected = true
    }
  }
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
