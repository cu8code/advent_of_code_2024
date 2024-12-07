import * as fs from "fs/promises";

// Function to generate all combinations of the operators (+, *, |) for a given length
function product(chars, n) {
  const result = [];

  function backtrack(current) {
    if (current.length === n) {
      result.push(current);
      return;
    }

    for (const c of chars) {
      backtrack(current + c);
    }
  }

  backtrack("");
  return result;
}

// Function to apply the operators to the numbers
function apply(c, a) {
  let l_res = a[0];  // Start with the first number in the array
  
  for (let i = 0; i < c.length; i++) {
    if (c[i] === "*") {
      l_res *= a[i + 1];  // Multiply with the next number
    } else if (c[i] === "+") {
      l_res += a[i + 1];  // Add the next number
    } else if (c[i] === "|") {
      // Concatenate numbers as strings
      l_res = Number(`${l_res}${a[i + 1]}`);
    }
  }
  
  return l_res;
}

// Main function to read the file and process the input data
async function processFile() {
  let result = 0;

  try {
    const ibf = await fs.readFile("input", "utf-8");
    
    for (const line of ibf.split("\n")) {
      if (!line.trim()) continue;  // Skip empty lines

      const res = line.split(":");
      const key = Number(res[0]);  // The expected result

      const v = res[1]
        ? res[1].split(" ").map((e) => Number(e))  // Parse the numbers
        : [];

      if (v.length < 2) continue;  // Skip if there are not enough numbers


      // Generate all possible combinations of operators
      const combinations = product(['+', '*', '|'], v.length - 1);
      
      for (const c of combinations) {
        const ll = apply(c, v);  // Apply the current combination to the values

        // Check if the result matches the expected key
        if (ll === key) {
          result += key;  // Add the matching result to the total
          console.log(`Match Found! Key: ${key}, Combination: ${c}, Result: ${ll}`);
          break;  // Stop once a match is found
        }
      }
    }

    console.log("Final Matching Results:", result);
  } catch (error) {
    console.error("Error reading the file:", error);
  }
}

processFile();

