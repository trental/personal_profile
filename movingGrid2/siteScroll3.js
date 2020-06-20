let stops = [0, 1400, 3000, 4600, 6200, 7800];
let position = 0;

const paperclipElement = document.querySelector('.paperclip');
const statementsElement = document.querySelector('.statements');
const ravencoinElement = document.querySelector('.ravencoin');
const flashcardsElement = document.querySelector('.flashcards');

const paperclip = new ProjectSelector(paperclipElement, transitionTime);
const statements = new ProjectSelector(statementsElement, transitionTime);
const ravencoin = new ProjectSelector(ravencoinElement, transitionTime);
const flashcards = new ProjectSelector(flashcardsElement, transitionTime);

function posTop() {
	// Browser Window Size and Position
	// copyright Stephen Chapman, 3rd Jan 2005, 8th Dec 2005
	return typeof window.pageYOffset != 'undefined'
		? window.pageYOffset
		: document.documentElement && document.documentElement.scrollTop
		? document.documentElement.scrollTop
		: document.body.scrollTop
		? document.body.scrollTop
		: 0;
}

function movePosition(delta) {
	console.log(ravencoin.getSelected());
	if (delta === 1) {
		position = Math.min(position + 1, stops.length - 1);
		window.scrollTo({
			top: stops[position],
			left: 0,
			behavior: 'smooth',
		});
	}
	if (delta === -1) {
		position = Math.max(position - 1, 0);
		window.scrollTo({
			top: stops[position],
			left: 0,
			behavior: 'smooth',
		});
	}
}

// let users navigate with mouse, arrow keys or space bar

window.addEventListener(
	'wheel',
	(event) => {
		event.preventDefault();
		const delta = Math.sign(event.deltaY);

		if (notScrolling) {
			movePosition(delta);
		}
	},
	{ passive: false }
);

window.addEventListener('keydown', function (event) {
	event.preventDefault();
	if (event.key === 'ArrowDown' || event.code == 'Space') {
		movePosition(1);
	}
	if (event.key === 'ArrowUp') {
		movePosition(-1);
	}
});

// prevent over-scrolling by looking to see if scrolling is currently active

let scrolling;
let notScrolling = true;

window.addEventListener(
	'scroll',
	(event) => {
		window.clearTimeout(scrolling);
		notScrolling = false;

		scrolling = setTimeout(function () {
			notScrolling = true;
		}, 100);
	},
	false
);

// some browsers (looking at you Firefox) don't like completing the scroll so you get pushed along

function gotoPosition() {
	window.scrollTo({
		top: stops[position],
		left: 0,
		behavior: 'smooth',
	});
}

setInterval(() => {
	if (notScrolling && posTop() != stops[position]) {
		gotoPosition();
	}
}, 100);

//
