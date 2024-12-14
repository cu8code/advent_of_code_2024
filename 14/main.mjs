// Advent of Code Template

import fs from 'fs';

// Reads the input file and returns its content as a string
const readInput = (filePath = 'input') => {
	return fs.readFileSync(filePath, 'utf-8').trim();
};

const print_grid = (positions, width, height) => {
  // Create a grid with the given width and height, filled with empty space
  const grid = Array.from({ length: height }, () => Array(width).fill('.'));

  // Iterate over the positions and mark them on the grid
  for (const [x, y] of positions) {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      grid[y][x] = 'X'; // Mark the position with 'X' (you can customize this)
    }
  }

  for (let row of grid) {
    console.log(row.join(' '));
  }
};

// Placeholder for solving part 1
const part1 = (input) => {
	const width = 11; // Total width
	const height = 7; // Total height
	const midx = Math.floor(width / 2); // Midpoint of width
	const midy = Math.floor(height / 2); // Midpoint of height

	let q1 = 0;
	let q2 = 0;
	let q3 = 0;
	let q4 = 0;

	const res = []

	for (const line of input.split('\n')) {
		const [px, py, vx, vy] = line.match(/\d+/g).map(Number); // Ensure the values are numbers
		const time = 100;
		const x = (px + vx * time) % width;
		const y = (py + vy * time) % height;

		res.push([x, y])
		if (y >= 0 && y < midy && x >= 0 && x < midx) {
			q1 += 1;
		} else if (y > midy && y < height && x >= 0 && x < midx) {
			q2 += 1;
		} else if (y > midy && y < height && x > midx && x < width) {
			q3 += 1;
		} else if (y >= 0 && y < midy && x > midx && x < width) {
			q4 += 1;
		}
	}
	print_grid(res, 11, 7)
	console.log(`${q1} * ${q2} * ${q3} * ${q4}`);
	return q1 * q2 * q3 * q4;
};

// Placeholder for solving part 2
const part2 = (input) => {
	// Add your part 2 solution logic here
	return 'Solution for part 2';
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
	const expected1 = 12;
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
