const fullHeight = 500;
const fullWidth = 600;
const scaleSize = 0.25;

class ProjectSelector {
	constructor(el, fullHeight, fullWidth, scaleSize) {
		this.element = el;
		this.TopLeft = new Project(
			document.querySelector('.TopLeft'),
			fullHeight,
			fullWidth,
			scaleSize,
			ss[0].cssRules[3]
		);
		this.TopLeft.toFullSquare();
		this.TopRight = new Project(
			document.querySelector('.TopRight'),
			fullHeight,
			fullWidth,
			scaleSize,
			ss[0].cssRules[4]
		);
		this.TopRight.toTallRectangle();
		this.BottomLeft = new Project(
			document.querySelector('.BottomLeft'),
			fullHeight,
			fullWidth,
			scaleSize,
			ss[0].cssRules[5]
		);
		this.BottomLeft.toFlatRectangle();
		this.BottomRight = new Project(
			document.querySelector('.BottomRight'),
			fullHeight,
			fullWidth,
			scaleSize,
			ss[0].cssRules[6]
		);
		this.BottomRight.toTinySquare();
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
	constructor(el, fullHeight, fullWidth, scaleSize, selector) {
		this.element = el;
		this.fullHeight = fullHeight;
		this.fullWidth = fullWidth;
		this.scaleSize = scaleSize;
		this.ss = selector;
	}

	clearSize() {
		this.element.classList.remove('toTinySquare');
		this.element.classList.remove('toFullSquare');
		this.element.classList.remove('toTallRectangle');
		this.element.classList.remove('toFlatRectangle');
	}

	toTinySquare() {
		this.clearSize();
		setTimeout(() => {
			this.ss.style.width = this.fullWidth * this.scaleSize;
			this.ss.style.height = this.fullHeight * this.scaleSize;
		}, 1000);
		this.element.classList.add('toTinySquare');
	}

	toFullSquare() {
		this.clearSize();
		setTimeout(() => {
			this.ss.style.width = this.fullWidth * (1 - this.scaleSize);
			this.ss.style.height = this.fullHeight * (1 - this.scaleSize);
		}, 1000);
		this.element.classList.add('toFullSquare');
	}

	toFlatRectangle() {
		this.clearSize();
		setTimeout(() => {
			this.ss.style.width = this.fullWidth * (1 - this.scaleSize);
			this.ss.style.height = this.fullHeight * this.scaleSize;
		});
		this.element.classList.add('toFlatRectangle');
	}

	toTallRectangle() {
		this.clearSize();
		setTimeout(() => {
			this.ss.style.width = this.fullWidth * this.scaleSize;
			this.ss.style.height = this.fullHeight * (1 - this.scaleSize);
			console.log(this.ss.style.height);
		}, 1000);
		this.element.classList.add('toTallRectangle');
	}
}
var ss = document.styleSheets;
console.log(ss[0]);

const AA = new ProjectSelector(
	document.querySelector('.projectSelector'),
	fullHeight,
	fullWidth,
	scaleSize
);
