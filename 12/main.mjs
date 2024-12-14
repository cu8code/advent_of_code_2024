// Advent of Code Template

import fs from 'fs';

// Reads the input file and returns its content as a string
const readInput = (filePath = 'input') => {
	return fs.readFileSync(filePath, 'utf-8').trim();
};

// Parses the input as a grid (array of arrays of characters)
// const readGrid = (filePath = 'input') => {
// 	return readInput(filePath).split('
// 		').map(line => line.split(''));
// };

// Placeholder for solving part 1
const part1 = (input) => {
	for (const line of input.split('\n')){
		const res = line.match(\/+d/g)
		console.log(res)
	}
	// Add your part 1 solution logic here
	return 'Solution for part 1';
};

// Placeholder for solving part 2
const part2 = (input) => {
	// Add your part 2 solution logic here
	return 'Solution for part 2';
};

// Utility: Converts a grid into a readable string
const gridToString = (grid) => {
	return grid.map(row => row.join('')).join('
		');
};

// Utility: Copies result to clipboard if both assertions pass (Linux Wayland - Fedora)
const copyToClipboard = (result) => {
	const { execSync } = require('child_process');
	execSync(`echo -n "${result}" | wl-copy`, { stdio: 'inherit' });
	console.log('Result copied to clipboard!');
};

// Main Execution
const main = () => {
	const input = readInput();

	const result1 = part1(input);
	console.log('Part 1:', result1);
	const result2 = part2(input);
	console.log('Part 2:', result2);

	// Example assertions (replace with real test cases)
	const expected1 = 'Expected Solution 1';
	const expected2 = 'Expected Solution 2';

	if (result1 === expected1 && result2 === expected2) {
		console.log('Both assertions passed!');
		copyToClipboard(`${result1}
${result2}`);
	} else {
		console.log('Assertions failed. Please check your code.');
	}
};

main();
