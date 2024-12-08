import { readFile } from "fs/promises";
const c = console.log;

async function main() {
  let file;
  try {
    file = await readFile("input");
  } catch (err) {
    c("Error reading the input file:", err.message);
    return;
  }

  file = file.toString().trim();

  const dir = {};
  const grid = [];

  // Populate the grid
  for (const line of file.split("\n")) {
    grid.push([...line.trim()]); // Ensure trailing spaces don't create empty elements
  }

  c("Grid:", grid);

  // Populate the `dir` object
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[0].length; row++) {
      const res = grid[col][row];
      if (res !== "." && res !== undefined) { // Check for valid grid cell
        dir[`${col}-${row}`] = res;
      }
    }
  }

  c("Dir:", dir);

  // Calculate distance
  const dis = (a, b, c, d) => Math.sqrt((a - c) ** 2 + (b - d) ** 2);

  // Extract row and column from the key
  const ex = (s) => {
    const parts = s.split("-").map(Number);
    return parts.length === 2 ? parts : [NaN, NaN]; // Return NaN if parsing fails
  };

  const result = [];

  // Iterate through the grid and find matching conditions
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[0].length; row++) {
      for (const ai of Object.keys(dir)) {
        for (const aj of Object.keys(dir)) {
          const [a, b] = ex(ai);
          const [e, d] = ex(aj);

          // Ensure all coordinates are valid and within bounds
          if (
            !isNaN(a) &&
            !isNaN(b) &&
            !isNaN(e) &&
            !isNaN(d) &&
            grid[a]?.[b] !== undefined &&
            grid[e]?.[d] !== undefined
          ) {
            const d1 = dis(a, b, col, row);
            const d2 = dis(e, d, col, row);

            // Matching condition with additional grid value check
            if (Math.abs(d1) === Math.abs(2 * d2) && grid[a][b] === grid[e][d]) {
              result.push([col, row]);
            }
          }
        }
      }
    }
  }

  // Eliminate duplicates
  const filteredResult = Array.from(
    new Set(result.map(([col, row]) => `${col}-${row}`))
  ).map((key) => key.split("-").map(Number));

  // Additional filtering logic (if needed)
  const finalFilteredResult = filteredResult.filter(([col, row]) => {
    // Ensure the coordinates are within bounds
    return col >= 0 && col < grid.length && row >= 0 && row < grid[0].length;
  });

  c("Final Filtered Result Length:", finalFilteredResult.length);
  c("Final Filtered Result:", finalFilteredResult);
}

// Run the main function
main();

