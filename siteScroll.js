let stops = [75, 1500, 3125, 4750, 6375, 8000];
let position = 0;
let projects = [];
let visitedAll = false;

document.querySelectorAll('.projectSelector').forEach((project) => {
	projects.push(new ProjectSelector(project, transitionTime));
});

const navLinks = document.querySelectorAll('.navLink');

navLinks.forEach((navLink) => {
	navLink.addEventListener('click', () => {
		position = navLink.dataset.position;
		gotoPosition();
	});
});

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

// move to next project
function moveForwards() {
	position = Math.min(position + 1, stops.length - 1);

	navLinks.forEach((navLink) => {
		navLink.classList.remove('navLinkSelected');
		if (navLink.dataset.position == position) {
			navLink.classList.add('navLinkSelected');
		}
	});

	window.scrollTo({
		top: stops[position],
		left: 0,
		behavior: 'smooth',
	});
}

// move to previous project
function moveBackwards() {
	position = Math.max(position - 1, 0);
	navLinks.forEach((navLink) => {
		navLink.classList.remove('navLinkSelected');
		if (navLink.dataset.position == position) {
			navLink.classList.add('navLinkSelected');
		}
	});
	window.scrollTo({
		top: stops[position],
		left: 0,
		behavior: 'smooth',
	});
}

// moving position can either be moving between projects or inside project detail
function movePosition(delta, method) {
	if (delta === 1) {
		if (position == 0 || position == 5 || method == 'mouse') {
			// no detail on intro or about so just move along
			moveForwards();
		} else if (
			// if on a project make sure that user has seen it before or is at the last detail
			(projects[position - 1].getSelectedSquare() == 3 &&
				projects[position - 1].getStack() == 0) ||
			visitedAll == true
		) {
			moveForwards();
		} else if (projects[position - 1].getStack() == 0 && notScrolling) {
			// first visit to project and not at end so flip through the details
			projects[position - 1].forward();
		}
		if (position == 5) {
			// you made it to the end so don't force the detail view
			visitedAll = true;
		}
	}
	if (delta === -1) {
		// similar to delta == 1 but in reverse
		if (position == 0 || position == 5) {
			moveBackwards();
		} else if (
			projects[position - 1].getSelectedSquare() == 0 ||
			visitedAll == true
		) {
			moveBackwards();
		} else {
			projects[position - 1].backward();
		}
	}
}

// let users navigate with mouse, arrow keys or space bar

window.addEventListener(
	'wheel',
	(event) => {
		event.preventDefault();
		const delta = Math.sign(event.deltaY);

		if (notScrolling) {
			movePosition(delta, 'mouse');
		}
	},
	{ passive: false }
);

window.addEventListener('keydown', function (event) {
	event.preventDefault();
	if (
		event.key === 'ArrowDown' ||
		event.code == 'Space' ||
		event.key === 'ArrowRight'
	) {
		movePosition(1, 'keyboard');
	}
	if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
		movePosition(-1, 'keyboard');
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

		// this lets users scroll to a box without getting corrected away from it
		for (let i = 0; i < stops.length; i++) {
			if (posTop() >= stops[i] - 400 && posTop() <= stops[i]) {
				position = i;
			}
		}

		scrolling = setTimeout(function () {
			notScrolling = true;
		}, 100);
	},
	false
);

// some browsers (looking at you Firefox) don't like completing the scroll so you get pushed along

function gotoPosition() {
	navLinks.forEach((navLink) => {
		navLink.classList.remove('navLinkSelected');
		if (navLink.dataset.position == position) {
			navLink.classList.add('navLinkSelected');
		}
	});

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
