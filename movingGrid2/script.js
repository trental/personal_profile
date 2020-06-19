const transitionTime = 500;

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
		if (event.target.dataset.placement === 'TopLeft') {
			this.TopLeft.toFullSquare();
			this.TopRight.toTallRectangle();
			this.BottomLeft.toFlatRectangle();
			this.BottomRight.toTinySquare();
		} else if (event.target.dataset.placement === 'TopRight') {
			this.TopLeft.toTallRectangle();
			this.TopRight.toFullSquare();
			this.BottomLeft.toTinySquare();
			this.BottomRight.toFlatRectangle();
		} else if (event.target.dataset.placement === 'BottomLeft') {
			this.TopLeft.toFlatRectangle();
			this.TopRight.toTinySquare();
			this.BottomLeft.toFullSquare();
			this.BottomRight.toTallRectangle();
		} else if (event.target.dataset.placement === 'BottomRight') {
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
		this.element.classList.add('toTinySquare');
		setTimeout(() => {
			this.clearSize();
			this.element.classList.add('tinySquare');
		}, this.transitionTime);
	}

	toFullSquare() {
		// this.clearSize();
		this.element.classList.add('toFullSquare');
		setTimeout(() => {
			this.clearSize();
			this.element.classList.add('fullSquare');
		}, this.transitionTime);
	}

	toFlatRectangle() {
		// this.clearSize();
		this.element.classList.add('toFlatRectangle');
		setTimeout(() => {
			this.clearSize();
			this.element.classList.add('flatRectangle');
		}, this.transitionTime);
	}

	toTallRectangle() {
		// this.clearSize();
		this.element.classList.add('toTallRectangle');
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
