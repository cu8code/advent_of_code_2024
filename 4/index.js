const fs = require("fs/promises");

const main = async () => { 
    try {
        let file = await fs.readFile("./input");
        file = file.toString();

        let grid = [];
        
        file.split('\n').forEach(line => {
            let chars = line.split('');
            chars = chars.slice(0, chars.length - 2);
            grid.push(chars);
        });

				grid.pop()
        console.log(grid);
    } catch (error) {
        console.error("Error reading the file:", error);
    }
}

main();
