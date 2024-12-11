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

console.assert(exec(ee, 6).length === 22);
console.assert(exec(ee, 25).length === 55312);
console.log(exec(ii, 75).length);

