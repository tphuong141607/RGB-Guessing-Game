
var colors = [];
var pickedColor;
var numSquares = 6;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	/***** Game Mode (listener) *****/
	setUpModeButtons();
	
	/***** Squares (listener) *****/
	setUpSquares();
	
	/*** Get starting ***/
	reset();
}

/***** Game Mode (listener) *****/
function setUpModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
			reset();		
		});
	}
}

/***** Squares (listener) *****/
function setUpSquares() {
	for (var i = 0; i < squares.length; i++) {
		// Add click listeners to squares
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;

			// If win:
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetBtn.textContent = "Play again?";

			// If pick the wrong color:
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try again";
			}
		});
	}
}


/***** Reset *****/
function reset() {
	// 1. Generate numSquares new colors
	colors = generateRandomColors(numSquares);
	
	// 2. Pick a new random color from those squares
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	
	// 3. Update UI (squares)
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
		squares[i].style.backgroundColor = colors[i];
	}
	
	// change h1 back to the original color
	h1.style.backgroundColor = "steelblue";
	resetBtn.textContent = "New colors"; // or using this.textContent
	messageDisplay.textContent = "";
}


/***** RESET the game *****/
resetBtn.addEventListener("click", function() {
	reset();
});


/***** SUPPORTING FUNCTIONS *****/
// Generate 1 color
function randomColor() {
	// RBG (0-255 each)
	var red = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);

	return "rgb(" + red + ", " + blue + ", " + green + ")";
}

// Generate all new colors
function generateRandomColors(num) {
	var arr = []
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	
	return arr;
}

// Pick 1 color from the array
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// Change all square to 1 color (happens when win)
function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
	
}

