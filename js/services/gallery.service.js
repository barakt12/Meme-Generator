'use strict'
let gFilterBy

let gKeywordSearchCountMap = {
  funny: 12,
  cute: 7,
  celebrity: 9,
  animal: 6,
  men: 4,
  kids: 10,
}
let gImgs = [
  {
    id: 1,
    url: `images/1.jpg`,
    keywords: ['funny', 'men', 'celebrity'],
  },
  {
    id: 2,
    url: `images/2.jpg`,
    keywords: ['animal', 'cute'],
  },
  {
    id: 3,
    url: `images/3.jpg`,
    keywords: ['cute', 'animal', 'kids'],
  },
  {
    id: 4,
    url: `images/4.jpg`,
    keywords: ['cat', 'cute', 'animal'],
  },
  {
    id: 5,
    url: `images/5.jpg`,
    keywords: ['kids', 'cute', 'funny'],
  },
  {
    id: 6,
    url: `images/6.jpg`,
    keywords: ['funny', 'men', 'celebrity'],
  },
  {
    id: 7,
    url: `images/7.jpg`,
    keywords: ['funny', 'kids', 'cute'],
  },
  {
    id: 8,
    url: `images/8.jpg`,
    keywords: ['funny', 'men', 'celebrity'],
  },
  {
    id: 9,
    url: `images/9.jpg`,
    keywords: ['funny', 'kids', 'cute'],
  },
  {
    id: 10,
    url: `images/10.jpg`,
    keywords: ['funny', 'men', 'celebrity'],
  },
  {
    id: 11,
    url: `images/11.jpg`,
    keywords: ['men', 'celebrity'],
  },
  {
    id: 12,
    url: `images/12.jpg`,
    keywords: ['funny', 'men', 'celebrity'],
  },
  {
    id: 13,
    url: `images/13.jpg`,
    keywords: ['men', 'celebrity'],
  },
  {
    id: 14,
    url: `images/14.jpg`,
    keywords: ['men', 'celebrity'],
  },
  {
    id: 15,
    url: `images/15.jpg`,
    keywords: ['men', 'celebrity'],
  },
  {
    id: 16,
    url: `images/16.jpg`,
    keywords: ['funny', 'men', 'celebrity'],
  },
  {
    id: 17,
    url: `images/17.jpg`,
    keywords: ['funny', 'men', 'celebrity'],
  },
  {
    id: 18,
    url: `images/18.jpg`,
    keywords: ['funny', 'men', 'celebrity'],
  },
]

function getImages() {
  if (gFilterBy) {
    let filteredImgs = []
    gImgs.forEach((image) => {
      return image.keywords.filter((keyword) => {
        if (keyword.includes(gFilterBy)) {
          return filteredImgs.push(image)
        }
      })
    })
    return filteredImgs
  }
  return gImgs
}

function setFilterImgs(val) {
  gFilterBy = val === 'all' ? '' : val.toLowerCase()
}

function loadImageFromInput(ev, onImageReady) {
  let reader = new FileReader()

  reader.onload = (event) => {
    let img = new Image()
    img.onload = onImageReady.bind(null, img)
    img.src = event.target.result
    gCurrImg = img
  }
  reader.readAsDataURL(ev.target.files[0])
}

function getKeywords() {
  return gKeywordSearchCountMap
}

function sizeUpKeyword(word) {
  gKeywordSearchCountMap[word]++
}
