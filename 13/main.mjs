import fs from 'fs';

let input = fs.readFileSync('./input', 'utf8');

input = input.split('\n\n');

// constant to add to all prize values (10 trillion)
const prizeAdd = 10000000000000;

// parse the input
const machines = [];
input.forEach(i => {
	i = i.split('\n');
	i = i.map(j => j.split(': ')[1].split(', '));
	i = i.map(j => j.map(k => parseInt(k.substring(2))));
	machines.push({
		a: [i[0][0], i[0][1]],
		b: [i[1][0], i[1][1]],
		prize: [prizeAdd + i[2][0], prizeAdd + i[2][1]]
	})
});

// loop through machines, sum up answer
let sum = 0;
machines.forEach(m => {
	sum += solveMachine(m);
});
console.log(`answer: ${sum}`);

function solveMachine(machine) {
	let matchingMoves;
	let minVal;

	// find matching x/y under this value
	// if impossbile we'll assume this machine doesn't have a solution
	const goal = 10000;

	let minMove = Math.min(Math.min(machine.a[0], machine.a[1]),
		Math.min(machine.b[0], machine.b[1]));

	// max number of button presses to check
	// ensures we'll check all combinations up to the goal value
	let maxPress = Math.ceil(goal/minMove);

	for (let a = 0; a <= maxPress; a++) {
		for (let b = 0; b <= maxPress; b++) {
			let x = machine.a[0] * a + machine.b[0] * b;
			let y = machine.a[1] * a + machine.b[1] * b;

			if (x > 0 && x === y) {
				if (minVal == null || x < minVal) {
					minVal = x;
					matchingMoves = [a, b];
				}
			}
		}
	}

	if (matchingMoves == null) {
		// machine has no valid way to get prize
		return 0;
	}

	let a = matchingMoves[0];
	let b = matchingMoves[1];

	let x = machine.a[0] * a + machine.b[0] * b;
	let y = machine.a[1] * a + machine.b[1] * b;

	// extrapolate to 10 trillion (get closest without going over)
	const mul = Math.floor(prizeAdd/x);

	a = a * mul;
	b = b * mul;

	x = machine.a[0] * a + machine.b[0] * b;
	y = machine.a[1] * a + machine.b[1] * b;


	let startA = a;
	let startB = b;

	let maxPrize = Math.max(machine.prize[0], machine.prize[1]);

	// maximum possible distance from our (new, extrapolated) x & y
	// to the highest prize value
	let maxDist = maxPrize - x;
	let minStep = Math.min(Math.min(machine.a[0], machine.a[1]),
		Math.min(machine.b[0], machine.b[1]));


	// maximum number of button presses to check to reach the prize
	maxPress = Math.ceil(maxDist/minStep);

	for (let aa = maxPress * -1; aa <= maxPress; aa++) {
		for (let bb = maxPress * -1; bb <= maxPress; bb++) {
			a = startA + aa;
			b = startB + bb;

			let x = machine.a[0] * a + machine.b[0] * b;
			let y = machine.a[1] * a + machine.b[1] * b;

			if (x === machine.prize[0] && y === machine.prize[1]) {
				// calculate coin cost
				return a * 3 + b;
			}
		}
	}

	return 0;
}
