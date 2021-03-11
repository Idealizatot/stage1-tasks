const playNote = (noteName) => {
	let sound = new Audio(`assets/audio/${noteName}.mp3`)
	sound.play();
} 

const checkClickMouse = event => {
	const noteName = event.target.dataset.note
	playNote(noteName, event)
	event.target.classList.add('piano-key-active')
}

const checkDownButton = (event) => {
	const btnName = event.code[event.code.length - 1]
	const noteButton = document.querySelector(`[data-letter="${btnName}"]`)
	
	if (!noteButton) {
		return;
	}

	if (event.repeat) {
		return
	}

	const noteName = noteButton.dataset.note
	playNote(noteName, event)
	noteButton.classList.add('piano-key-active')
}

const checkUpButton = event => {
	const btnName = event.code[event.code.length - 1]
	const noteButton = document.querySelector(`[data-letter="${btnName}"]`)
	if (!noteButton) {
		return;
	}
	noteButton.classList.remove('piano-key-active')
}

const pianoButtons = document.querySelectorAll('.piano-key')
pianoButtons.forEach(element => {
	element.addEventListener('mousedown', (event) => {
		checkClickMouse(event)
	})
	element.addEventListener('mouseup', (event) => {
		event.target.classList.remove('piano-key-active')
	})
	element.addEventListener('mouseout', (event) => {
		event.target.classList.remove('piano-key-active')
	})
})

window.addEventListener('keydown', checkDownButton)
window.addEventListener('keyup', checkUpButton)

const deleteActive = () => {
	let buttons = document.querySelectorAll('.btn-container>button')
	buttons.forEach(element => {
		element.classList.remove('btn-active')
	})
} 

const notesButton = document.getElementById('notes');
notesButton.addEventListener('click', () => {
	pianoButtons.forEach(element => {
		element.classList.remove('piano-key-letters')
		element.classList.add('piano-key-notes')
	})
	deleteActive()
	notesButton.classList.add('btn-active')
})

const lettersButton = document.getElementById('letters');
lettersButton.addEventListener('click', () => {
	pianoButtons.forEach(element => {
		element.classList.remove('piano-key-notes')
		element.classList.add('piano-key-letters')
		element.classList.add('btn-active')
	})
	deleteActive()
	lettersButton.classList.add('btn-active')
})

const panel = document.getElementById('piano')

const slide = event => checkClickMouse(event)
panel.addEventListener('mousedown', () => {
	pianoButtons.forEach(element => {
		element.addEventListener('mouseover', slide)
	})
})

panel.addEventListener('mouseup', () => {
	pianoButtons.forEach(element => {
		element.removeEventListener('mouseover', slide)
	})
})

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

const fullScreenButton = document.getElementById('fullscreen')
fullScreenButton.addEventListener('click', toggleFullScreen)