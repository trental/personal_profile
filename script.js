const pre = document.querySelector('.query');

function fillPre(text) {
	let inner = '';
	let newLine = true;
	let letters = text.split('');
	let counter = 0;
	while (letters.length > 0) {
		counter++;
		let char = letters.shift();
		console.log(char);
		setTimeout(() => {
			inner += char;
			pre.innerHTML = inner;
		}, counter * 10);
	}
	// for (c in text) {
	// 	console.log(c);
	// 	console.log(text[c]);
	// 	setTimeout(() => {
	// 		console.log(c);
	// 		// console.log(text[c]);
	// 		if (text[c] === ' ' && newLine) {
	// 			inner += '&nbsp;';
	// 		} else {
	// 			newLine = false;
	// 		}

	// 		if (text[c] === '\n') {
	// 			newLine = true;
	// 			inner += '<br>';
	// 		} else if (text[c] === '>') {
	// 			inner += text[c];
	// 		} else {
	// 			inner += text[c];
	// 		}

	// 		// console.log(inner);
	// 		pre.innerHTML = inner;
	// 	}, c * 10);
	// }
	// pre.innerHTML = 'hello';
}

fetch('data/home.txt')
	.then((response) => response.text())
	.then((text) => fillPre(text));
