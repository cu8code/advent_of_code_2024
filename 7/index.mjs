import * as fs from "fs/promises";

/**
 * Generates all combinations of the given characters for a specified length.
 * 
 * @param {string[]} chars - The set of characters (operators) to combine.
 * @param {number} n - The length of the combinations to generate.
 * @returns {string[]} An array of all combinations of the characters of length `n`.
 */
function product(chars, n) {
  const result = [];

  /**
   * Helper function to generate combinations using backtracking.
   * 
   * @param {string} current - The current combination being formed.
   */
  function backtrack(current) {
    // If the combination has reached the desired length, add it to the result
    if (current.length === n) {
      result.push(current);
      return;
    }

    // Recursively add each character from `chars` to the current combination
    for (const c of chars) {
      backtrack(current + c);
    }
  }

  // Start generating combinations from an empty string
  backtrack("");
  return result;
}

/**
 * Applies a list of operators to an array of numbers and returns the result.
 * 
 * @param {string[]} c - An array of operators to apply between the numbers.
 * @param {number[]} a - An array of numbers to apply the operators to.
 * @returns {number} The final result after applying all operators.
 */
function apply(c, a) {
  let l_res = a[0];  // Start with the first number in the array
  
  // Iterate through each operator and apply it to the numbers
  for (let i = 0; i < c.length; i++) {
    if (c[i] === "*") {
      l_res *= a[i + 1];  // Multiply with the next number
    } else if (c[i] === "+") {
      l_res += a[i + 1];  // Add the next number
    } else if (c[i] === "|") {
      // Concatenate numbers as strings and then convert to a number
      l_res = Number(`${l_res}${a[i + 1]}`);
    }
  }
  
  return l_res;
}

/**
 * Reads an input file, processes the data, and calculates the sum of matching results.
 * 
 * The function reads each line of the file, splits it into a key (expected result)
 * and a list of numbers, generates all possible combinations of operators (+, *, |),
 * applies them to the numbers, and checks if any combination matches the expected result.
 * If a match is found, it adds the matching result to the total.
 */
async function processFile() {
  let result = 0;  // Variable to store the total sum of matching results

  try {
    // Read the content of the input file
    const ibf = await fs.readFile("input", "utf-8");
    
    // Process each line in the file
    for (const line of ibf.split("\n")) {
      if (!line.trim()) continue;  // Skip empty lines

      // Split the line into the expected result and the numbers
      const res = line.split(":");
      const key = Number(res[0]);  // The expected result (key)

      const v = res[1]
        ? res[1].split(" ").map((e) => Number(e))  // Parse the numbers into an array
        : [];

      // Skip lines that don't contain at least two numbers
      if (v.length < 2) continue;

      // Generate all possible combinations of operators for the given number of numbers
      const combinations = product(['+', '*', '|'], v.length - 1);
      
      // Check each combination to see if it matches the expected result
      for (const c of combinations) {
        const ll = apply(c, v);  // Apply the current combination to the values

        // If the result matches the expected key, add it to the total and log the result
        if (ll === key) {
          result += key;
          console.log(`Match Found! Key: ${key}, Combination: ${c}, Result: ${ll}`);
          break;  // Stop once a match is found
        }
      }
    }

    // Log the final total sum of matching results
    console.log("Final Matching Results:", result);
  } catch (error) {
    // Handle any errors that occur during file reading
    console.error("Error reading the file:", error);
  }
}

// Execute the main function to process the file
processFile();

