const pre = document.querySelector('.query');

function splitConsole(text) {
	let consoleData = [];
	let commandResponseBlocks = text.split('    >');
	commandResponseBlocks.forEach((commandResponseBlock) => {
		let data = commandResponseBlock.split('<<enter>>');
		let newBlock = {};
		newBlock.command = data[0];
		newBlock.response = data[1];
		if (newBlock.command != '') consoleData.push(newBlock);
	});
	console.log(consoleData);
}

// function fillPre(text) {
// 	let inner = '';
// 	let newLine = true;
// 	let letters = text.split('    >');
// 	let counter = 0;
// 	console.log(letters);
// while (letters.length > 0) {
// 	counter++;
// 	let c = letters.shift();
// 	console.log(c);
// 	setTimeout(() => {
// 		if (c === ' ' && newLine) {
// 			inner += '&nbsp;';
// 		} else {
// 			newLine = false;
// 		}
// 		if (c === '\n') {
// 			newLine = true;
// 			inner += '<br>';
// 		} else if (c === '>') {
// 			inner += c;
// 		} else {
// 			inner += c;
// 		}
// 		// console.log(inner);
// 		pre.innerHTML = inner;
// 	}, counter);
// }
// }

fetch('data/home.txt')
	.then((response) => response.text())
	.then((text) => splitConsole(text));
