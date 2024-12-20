import fs from 'fs';

// Reads the input file and returns its content as a string
const readInput = (filePath = 'input') => {
	const res = fs.readFileSync(filePath, 'utf-8').trim();
	return res
};

// Placeholder for solving part 1
const part1 = (input) => {
	let [g, p] = input.split("\n\n")
	g = g.trim().split('\n').map(e => e.trim().split(''))
	p = p.trim().split("")
	let t = []
	for(let col=0; col < g.length; col++){
		for(let row=0; row< g[col].length; row++){
			if(g[col][row] === '@'){
				t = [col, row]
			}
		}
	}
	const move = (p) => {
		let [cc, cr] = t
		let e = [[cc, cr]]
		while(true){
			// Calculate next position first
			let nextCc = cc
			let nextCr = cr
			if(p === "<") nextCr = cr - 1
			if(p === ">") nextCr = cr + 1
			if(p === "^") nextCc = cc - 1
			if(p === "v") nextCc = cc + 1

			// Break if we'd go out of bounds
			if (nextCc < 0 || nextCc >= g.length || nextCr < 0 || nextCr >= g[0].length) break

			cc = nextCc
			cr = nextCr

			if (g[cc][cr] === "#") return
			if (g[cc][cr] === ".") {
				e.push([cc, cr])
				break
			}
			if (g[cc][cr] === "O") {
				e.push([cc, cr])
				continue
			}
			break  // Break if we hit an unknown tile type
		}
		if (e.length > 0){
			if (e.length === 2){
				let [c, r] = e.pop()
				let [cc, rr] = t
				g[c][r] = "@"
				g[cc][rr] = "."
				t = [c, r]
			}
			else if (e.length > 2) {
				let [s, tt] = e.splice(0, 2)
				for (let [cc, rr] of e){
					g[cc][rr] = "O"
				}
				g[s[0]][s[1]] = '.'
				g[tt[0]][tt[1]] = '@'
				t = [tt[0], tt[1]]
			}
		}
	}
	for (let e of p){
		move(e)
	}
	let sum = 0
	for(let col=0; col < g.length; col++){
		for(let row=0; row< g[col].length; row++){
			if (g[col][row] === "O"){
				sum += 100 * col + row 
			}
		}
	}
	return sum
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
