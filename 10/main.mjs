// Puzzle for Day 10: https://adventofcode.com/2024/day/10


/**
 * Part 2 Solution
 * @param {{starts: {y: number, x: number}[], map: number[][]}} data Input data
 * @returns {number} Total Ratings for each trail
 */
const part2 = (data) => {
  // Save the total rating for each trail
  let total = 0; 

  // Check each trail head separately
  for(let start of data.starts){
    // Add start to the list of positions to be checked
    let positions = [structuredClone(start)];

    // Breadth First Search (BFS) to find the all possible ways to 
    // height 9 locations that are reachable from the start location.
    while(positions.length > 0){
      // Shift the next location off the front of the positions to be checked array
      let current = positions.shift();
      // If the height is 9 then this is a base case and no more searching needs to be done
      if(data.map[current.y][current.x] === 9){
        // Add 1 tot the total number of possible paths to a height 9 location
        total ++;
        // Continue processing without considering any next possible spaces from this location
        continue;
      }
      // Get the next positions if this is not as base case
      let nextPositions = [
        {y: current.y-1, x: current.x}, // up
        {y: current.y+1, x: current.x}, // down
        {y: current.y, x: current.x-1}, // left
        {y: current.y, x: current.x+1}, // right
      ]
      // Filter out the next possible locations that are not valid
      .filter((val) => 
        // Is location within possible points on the map
        val.y >= 0 &&  
        val.y < data.map.length && 
        val.x >= 0 && 
        val.x < data.map[val.y].length && 
        // Is the next place an appropriate step up from the current location
        data.map[val.y][val.x] == data.map[current.y][current.x] + 1);

      // Add each next possible location to the array of positions to be checked.
      nextPositions.forEach(val => {
        positions.push({y: val.y, x: val.x});
      });
    }
  }

  return total;
}

/**
 * Part 1 Solution
 * @param {{starts: {y: number, x: number}[], map: number[][]}} data Input data
 * @returns {number} Total Scores for each trail
 */
const part1 = (data) => {
  // Save the total of all scores for each trail head
  let total = 0; 

  // Check each trail head separately
  for(let start of data.starts){
    // Keep track of previously visited locations
    let visited = new Set();
    // Add start to the previously visited
    visited.add(`${start.y},${start.x}`);
    // Add start to the list of positions to be checked
    let positions = [structuredClone(start)];
    // Keep track of height 9 spots that have been found. 
    // Use a set to make sure locations don't get double counted.
    let found = new Set();

    // Breadth First Search (BFS) to find the height 9 locations 
    // that are reachable from the start location
    while(positions.length > 0){
      // Shift the next location off the front of the positions to be checked array
      let current = positions.shift();
      // If the height is 9 then this is a base case and no more searching needs to be done
      if(data.map[current.y][current.x] === 9){
        // Add this to the set of found locations.
        found.add(`${current.y},${current.x}`);
        // Continue processing without considering any next possible spaces from this location
        continue;
      }
      // Get the next positions if this is not as base case
      let nextPositions = [
        {y: current.y-1, x: current.x}, // up
        {y: current.y+1, x: current.x}, // down
        {y: current.y, x: current.x-1}, // left
        {y: current.y, x: current.x+1}, // right
      ]
      // Filter out the next possible locations that are not valid
      .filter((val) => 
        // Is location within possible points on the map
        val.y >= 0 &&  
        val.y < data.map.length && 
        val.x >= 0 && 
        val.x < data.map[val.y].length && 
        // Is the next place an appropriate step up by one from the current location
        data.map[val.y][val.x] == data.map[current.y][current.x] + 1 && 
        // Has this location already been visited
        !visited.has(`${val.y},${val.x}`));

      // Add the next positions to the set if visited locations and the array of positions to be checked.
      nextPositions.forEach(val => {
        visited.add(`${val.y},${val.x}`);
        positions.push({y: val.y, x: val.x});
      });
    }

    // Add the total number of found 9 height locations from this start to the total
    total += found.size;
  }

  return total;
}

/**
 * Parse Input File
 * @param {string[]} fileContents The input file contents as an array of strings for each line
 * @returns {{starts: {y: number, x: number}[], map: number[][]}} A list of start locations and a 2D 
 * number array of all map locations
 */
const parseInput = (fileContents) => {
  // Keep track of all start locations
  let starts = [];
  // Parse each location into a number form string
  let map = fileContents.map((line, y) => {
    // Split each line into a separate character in the array
    return line.split("").map((location, x) => {
      // Parse the locations values as an int
      let num = parseInt(location);
      // If it is 0 also add the location to the starts array
      if(num === 0)
        starts.push({y, x});
      // Return the number to the map output
      return num;
    });
  });
  return {starts, map};
}

export const run = async (fileContents) => {
  let data = parseInput(fileContents);
  let result1 = part1(data);
  let result2 = part2(data);
  return {part1: result1, part2: result2};
}


console.log(run(`1098921121187650126589432104301010017898
2347810030090543237676546765218921326323
3256723345121789078545345896237635495410
0189654656230650129454210910146546786898
1018706787649843212323407893056544576781
0123215498556764501012216324567033675410
1054912389440189650983345413498122189323
2367804322339218761874214102439232075014
3494565011878307010965302101521001456985
4583876910965498123434456517617652327876
9672978894328767894525467898908543410434
8701569765419456987616321010119654306523
7616054100300345865407890121236701217810
4567123231201210870301456290547896332912
3258834998303456961210387787678987441003
4109985867214327898341295689432196556764
3457876754321016987654254776501001105895
2568965698130123216510163897567232234996
1077654147010154105425672198498143497887
2089503056923269012334789010398056786546
1123412147874678901109011001267049805430
0109892130965165210278921123452121012321
1236783021089014321367630038983430328901
0345634569870156752456541127604589437610
1267825478763247843898430934510678576523
3216910089654130956707321874321987689430
4505432198703021013210012365899654238321
3699801789012982787309898456718723148980
2789789678101276896456721032100210057671
1008650521010345785454434549321321060362
2210541430121289890365410678732639871250
4341232510537656701274320521548747898341
1056341423498545432789201230699656743432
2967650345567230101687112345788745234569
3878981236750121211096001296787230199678
4589870109889032349125410187590123288767
5679665010976541498934231095691054177678
3038754129889650587432145654782567065549
2125603236778765676501098723123478450030
3034512345654656565410181010010989321121`.split('\n')))
