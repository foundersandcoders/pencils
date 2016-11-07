'use strict'

// This is for keeping track of the last 'touched' row.
let lastIndex = -1

/**
 * Converts an array-like object to an array.
 * @param {object} arrayLikeObject Object to convert.
 * @returns {array}
 */
const toArr = arrayLikeObject =>
  Array.prototype.slice.call(arrayLikeObject)

/**
 * Checks whether an element has the class 'shift'.
 * @param {object} elem The element to check.
 * @returns {boolean}
 */
const isShifted = elem =>
  elem && toArr(elem.classList).includes('shift')

/**
 * Removes a class from an element.
 * @param {string} class The class name to remove.
 * @param {elem} elem The element to alter.
 * @returns {undefined}
 */
const removeClass = (classToRemove, elem) =>
  elem.className = toArr( elem.classList ).filter( x => x !== classToRemove ).join(' ')

/**
 * Accepts touch or mouseover event and returns the related element.
 * Needs to use `elementFromPoint` as touch dragging doesn't
 * update the `currentTarget` as it moves through new elements.
 * @param {object} event DOM event.
 * @returns {object} The HTML element the cursor or touch is currently over.
 */
const getCurrentElement = event => {
  const coordinates =
    event.touches
      ? {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY
        }
      : {
          x: event.pageX,
          y: event.pageY
        }

  return document.elementFromPoint(coordinates.x, coordinates.y)
}

function zip (e) {

  const currentElement = getCurrentElement(e)

  if (!currentElement || currentElement.nodeName === 'BODY') return

  const currentRow = currentElement.closest('.row')
  const previousRow = document.getElementsByClassName(lastIndex)[0]

  const currentIndex = Number( currentRow.classList[1] )

  currentIndex === (lastIndex - 1) && !isShifted(previousRow)
    ? removeClass('shift', currentRow)
    : currentIndex === (lastIndex + 1) && ( currentIndex === 2 || isShifted(document.getElementsByClassName(currentIndex - 2)[0]) )
        ? previousRow.className += ' shift'
        : null

  lastIndex = currentIndex
}

;(function addPencils () {
  return Array.apply(this, Array(30))
  .forEach( (_, index) =>
    document.body.innerHTML +=
      `
      <div class="row ${index + 1}">
        ${window.pencil}
        ${window.pencil}
      </div>
      `
  )
})()

;(function setUpListeners () {
  return toArr(
    document.getElementsByClassName('row')
  )
  .forEach(
    elem => {
      elem.addEventListener( 'mousemove', zip )
      elem.addEventListener( 'touchmove', zip )
    }
  )
})()
