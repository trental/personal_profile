let position = 0;
let element = document.querySelector('body');
const visited = [0, 0, 0, 0];

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
	if (delta === 1) {
		if (!element.classList.contains('stuck')) {
			window.scrollTo({
				top: 1600,
				left: 0,
				behavior: 'smooth',
			});
			// position = posTop();
			console.log('unstuck');
		} else {
			position = Math.min(position + 1600, 7400);
			console.log('stuck');
		}
		console.log('position:', position);
		console.log('element:', posTop());

		if (posTop() >= 1600 && posTop() <= 2200) {
			element.classList.add('stuck');
		}
		if (position >= 2200 && posTop() < 3200) {
			element.classList.remove('stuck');
		}

		// if (posTop() >= 2910 && posTop() <= 3150) {
		// 	element.classList.add('stuck');
		// }
		// if (position >= 3150 && posTop() < 4600) {
		// 	element.classList.remove('stuck');
		// }

		// if (posTop() >= 4500 && posTop() <= 4850) {
		// 	element.classList.add('stuck');
		// }
		// if (position >= 4850 && posTop() < 10000) {
		// 	element.classList.remove('stuck');
		// }
	} else if (delta === -1) {
		if (!element.classList.contains('stuck')) {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
			// position = posTop();
		} else {
			position = Math.max(position - 1600, 0);
		}
		console.log('position:', position);
		console.log('element:', posTop());
	}
}

window.addEventListener(
	'wheel',
	(event) => {
		event.preventDefault();
		const delta = Math.sign(event.deltaY);
		movePosition(delta);
	},
	{ passive: false }
);

window.addEventListener('keydown', function (event) {
	event.preventDefault();
	console.log(event.key);
	if (event.key === 'ArrowDown' || event.code == 'Space') {
		movePosition(1);
	}
	if (event.key === 'ArrowUp') {
		movePosition(-1);
	}
});
