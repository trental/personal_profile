const transitionTime = 350;

class ProjectSelector {
	constructor(el, transitionTime) {
		this.element = el;
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
	}

	onClick(event) {
		const clicked = event.target.dataset.placement;
		if (clicked === 'TopLeft') {
			this.TopLeft.toFullSquare();
			this.TopRight.toTallRectangle();
			this.BottomLeft.toFlatRectangle();
			this.BottomRight.toTinySquare();
		} else if (clicked === 'TopRight') {
			this.TopLeft.toTallRectangle();
			this.TopRight.toFullSquare();
			this.BottomLeft.toTinySquare();
			this.BottomRight.toFlatRectangle();
		} else if (clicked === 'BottomLeft') {
			this.TopLeft.toFlatRectangle();
			this.TopRight.toTinySquare();
			this.BottomLeft.toFullSquare();
			this.BottomRight.toTallRectangle();
		} else if (clicked === 'BottomRight') {
			this.TopLeft.toTinySquare();
			this.TopRight.toFlatRectangle();
			this.BottomLeft.toTallRectangle();
			this.BottomRight.toFullSquare();
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
