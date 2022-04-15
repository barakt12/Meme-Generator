'use strict'

function randomNameGen() {
  let str = 'Meme_'
  for (let i = 0; i < 4; i++) {
    str += Math.floor(Math.random() * 5)
  }
  return str
}
