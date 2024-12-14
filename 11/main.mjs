const ii = `112 1110 163902 0 7656027 83039 9 74`.split(' ').map(Number);
const ee = `125 17`.split(' ').map(Number);

const exec = (i, t) => {
	let fres = i;
	while (t) {
		t--;
		let r = [];
		for (let x = 0; x < fres.length; x++) {
			if (fres[x] === 0) {
				r.push(1);
			} else if (String(fres[x]).length % 2 === 0) {
				let res = String(fres[x]);
				let half = Math.floor(res.length / 2);
				r.push(Number(res.slice(0, half)));
				r.push(Number(res.slice(half)));
			} else {
				r.push(fres[x] * 2024);
			}
		}
		fres = r;
	}
	return fres;
};

const hash = {};
const exec2 = (stone, times) => {
	if (hash.hasOwnProperty(stone) && times > 0) {
		return hash[stone];
	}

	if (times === 0) {
		return 1;
	} else if (stone === 0) {
		return exec2(1, times-1);
	} else if (String(stone).length % 2 === 0) {
		const res = String(stone);
		const half = Math.floor(res.length / 2);
		const result = exec2(Number(res.slice(0, half)), times - 1) + exec2(Number(res.slice(half)), times - 1);
		hash[stone] = result;
		return result;
	} else {
		const result = exec2(stone * 2024, times - 1);
		hash[stone] = result;
		return result;
	}
};

// console.log(ii.reduce((sum, item) => sum + exec2(item, 75), 0));
console.log(ee.reduce((sum, item) => sum + exec2(item, 4), 0));

