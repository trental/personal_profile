const transitionTime = 350;

class ProjectSelector {
	constructor(el, transitionTime) {
		this.element = el;
		this.transitionTime = transitionTime;
		this.TopLeft = new ProjectDetail(
			el.querySelector('.TopLeft'),
			transitionTime
		);
		this.TopRight = new ProjectDetail(
			el.querySelector('.TopRight'),
			transitionTime
		);
		this.BottomLeft = new ProjectDetail(
			el.querySelector('.BottomLeft'),
			transitionTime
		);
		this.BottomRight = new ProjectDetail(
			el.querySelector('.BottomRight'),
			transitionTime
		);
		this.element.onclick = this.onClick.bind(this);
		this.position = 0;
		this.stack = 0;
	}

	decreaseStack() {
		this.stack--;
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
		this.position = Math.min(this.position + 1, 3);
		if (this.position == 1) {
			this.stack++;
			setTimeout(() => {
				this.goTopRight();
				this.decreaseStack();
			}, this.stack * this.transitionTime);
		} else if (this.position == 2) {
			this.stack++;
			setTimeout(() => {
				this.goBottomLeft();
				this.decreaseStack();
			}, this.stack * this.transitionTime);
		} else if (this.position == 3) {
			this.stack++;
			setTimeout(() => {
				this.goBottomRight();
				this.decreaseStack();
			}, this.stack * this.transitionTime);
		}
	}

	backward() {
		if (this.position == 1) {
			this.stack++;
			setTimeout(() => {
				this.goTopLeft();
				this.decreaseStack();
			}, this.stack * this.transitionTime);
		} else if (this.position == 2) {
			this.stack++;
			setTimeout(() => {
				this.goTopRight();
				this.decreaseStack();
			}, this.stack * this.transitionTime);
		} else if (this.position == 3) {
			this.stack++;
			setTimeout(() => {
				this.goBottomLeft();
				this.decreaseStack();
			}, this.stack * this.transitionTime);
		}
		this.position = Math.max(this.position - 1, 0);
	}

	onClick(e) {
		const clicked = e.target.dataset.placement;
		if (clicked === 'TopLeft') {
			this.goTopLeft();
			this.position = 0;
		} else if (clicked === 'TopRight') {
			this.goTopRight();
			this.position = 1;
		} else if (clicked === 'BottomLeft') {
			this.goBottomLeft();
			this.position = 2;
		} else if (clicked === 'BottomRight') {
			this.goBottomRight();
			this.position = 3;
		}
	}

	getSelectedSquare() {
		return this.position;
	}

	getStack() {
		return this.stack;
	}
}

class ProjectDetail {
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
		this.element.classList.remove('notFullSquare');
	}

	toTinySquare() {
		setTimeout(() => {
			this.element.classList.add('toTinySquare');
			this.element.classList.add('notFullSquare');
		}, 0);

		setTimeout(() => {
			this.clearSize();
			this.element.classList.add('tinySquare');
			this.element.classList.add('notFullSquare');
		}, this.transitionTime);
	}

	toFullSquare() {
		setTimeout(() => {
			this.element.classList.add('toFullSquare');
			if (!this.element.classList.contains('fullSquare')) {
				this.element.classList.add('notFullSquare');
			}
		}, 0);

		setTimeout(() => {
			this.clearSize();
			this.element.classList.add('fullSquare');
		}, this.transitionTime);
	}

	toFlatRectangle() {
		setTimeout(() => {
			this.element.classList.add('toFlatRectangle');
			this.element.classList.add('notFullSquare');
		}, 0);

		setTimeout(() => {
			this.clearSize();
			this.element.classList.add('flatRectangle');
			this.element.classList.add('notFullSquare');
		}, this.transitionTime);
	}

	toTallRectangle() {
		setTimeout(() => {
			this.element.classList.add('toTallRectangle');
			this.element.classList.add('notFullSquare');
		}, 0);

		setTimeout(() => {
			this.clearSize();
			this.element.classList.add('tallRectangle');
			this.element.classList.add('notFullSquare');
		}, this.transitionTime);
	}
}
