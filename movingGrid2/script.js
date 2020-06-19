const transitionTime = 350;

class ProjectSelector {
	constructor(el, transitionTime) {
		this.element = el;
		this.transitionTime = transitionTime;
		this.TopLeft = new Project(
			document.querySelector('.TopLeft'),
			transitionTime
		);
		this.TopRight = new Project(
			document.querySelector('.TopRight'),
			transitionTime
		);
		this.BottomLeft = new Project(
			document.querySelector('.BottomLeft'),
			transitionTime
		);
		this.BottomRight = new Project(
			document.querySelector('.BottomRight'),
			transitionTime
		);
		this.element.onclick = this.onClick.bind(this);
		this.position = 0;
		this.stack = 0;
	}

	decreaseStack() {
		this.stack--;
		console.log('stack:', this.stack);
	}

	goTopLeft() {
		this.TopLeft.toFullSquare();
		this.TopRight.toTallRectangle();
		this.BottomLeft.toFlatRectangle();
		this.BottomRight.toTinySquare();
	}

	goTopRight() {
		this.TopLeft.toTallRectangle();
		this.TopRight.toFullSquare();
		this.BottomLeft.toTinySquare();
		this.BottomRight.toFlatRectangle();
	}

	goBottomLeft() {
		this.TopLeft.toFlatRectangle();
		this.TopRight.toTinySquare();
		this.BottomLeft.toFullSquare();
		this.BottomRight.toTallRectangle();
	}

	goBottomRight() {
		this.TopLeft.toTinySquare();
		this.TopRight.toFlatRectangle();
		this.BottomLeft.toTallRectangle();
		this.BottomRight.toFullSquare();
	}

	forward() {
		this.position = Math.min(this.position + 1, 40);
		console.log(this.position);
		if (this.position == 10) {
			this.stack++;
			setTimeout(() => {
				this.goTopRight();
				this.decreaseStack();
			}, this.stack * this.transitionTime);
		} else if (this.position == 20) {
			this.stack++;
			setTimeout(() => {
				this.goBottomLeft();
				this.decreaseStack();
			}, this.stack * this.transitionTime);
		} else if (this.position == 30) {
			this.stack++;
			setTimeout(() => {
				this.goBottomRight();
				this.decreaseStack();
			}, this.stack * this.transitionTime);
		}
	}

	backward() {
		this.position = Math.max(this.position - 1, 0);
		console.log(this.position);
		if (this.position == 10) {
			this.stack++;
			setTimeout(() => {
				this.goTopLeft();
				this.decreaseStack();
			}, this.stack * this.transitionTime);
		} else if (this.position == 20) {
			this.stack++;
			setTimeout(() => {
				this.goTopRight();
				this.decreaseStack();
			}, this.stack * this.transitionTime);
		} else if (this.position == 30) {
			this.stack++;
			setTimeout(() => {
				this.goBottomLeft();
				this.decreaseStack();
			}, this.stack * this.transitionTime);
		}
	}

	onClick(e) {
		const clicked = e.target.dataset.placement;
		if (clicked === 'TopLeft') {
			this.goTopLeft();
		} else if (clicked === 'TopRight') {
			this.goTopRight();
		} else if (clicked === 'BottomLeft') {
			this.goBottomLeft();
		} else if (clicked === 'BottomRight') {
			this.goBottomRight();
		}
	}
}

class Project {
	constructor(el, transitionTime) {
		this.element = el;
		this.transitionTime = transitionTime;
	}

	clearSize() {
		this.element.classList.remove('tinySquare');
		this.element.classList.remove('fullSquare');
		this.element.classList.remove('tallRectangle');
		this.element.classList.remove('flatRectangle');
		this.element.classList.remove('toTinySquare');
		this.element.classList.remove('toFullSquare');
		this.element.classList.remove('toTallRectangle');
		this.element.classList.remove('toFlatRectangle');
	}

	toTinySquare() {
		setTimeout(() => {
			this.element.classList.add('toTinySquare');
		}, 0);

		setTimeout(() => {
			this.clearSize();
			this.element.classList.add('tinySquare');
		}, this.transitionTime);
	}

	toFullSquare() {
		// this.clearSize();
		setTimeout(() => {
			this.element.classList.add('toFullSquare');
		}, 0);

		setTimeout(() => {
			this.clearSize();
			this.element.classList.add('fullSquare');
		}, this.transitionTime);
	}

	toFlatRectangle() {
		// this.clearSize();
		setTimeout(() => {
			this.element.classList.add('toFlatRectangle');
		}, 0);

		setTimeout(() => {
			this.clearSize();
			this.element.classList.add('flatRectangle');
		}, this.transitionTime);
	}

	toTallRectangle() {
		// this.clearSize();
		setTimeout(() => {
			this.element.classList.add('toTallRectangle');
		}, 0);

		setTimeout(() => {
			this.clearSize();
			this.element.classList.add('tallRectangle');
		}, this.transitionTime);
	}
}

const AA = new ProjectSelector(
	document.querySelector('.projectSelector'),
	transitionTime
);

window.addEventListener('wheel', (event) => {
	const delta = Math.sign(event.deltaY);
	if (delta == 1) {
		AA.forward();
	} else {
		AA.backward();
	}
});
