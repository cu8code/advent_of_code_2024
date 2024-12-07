const fs = require('fs');
const path = require('path');

// Get the folder name from command line arguments
const folderName = process.argv[2]; // First argument after node and script name

// Check if a number is provided
if (!folderName || isNaN(folderName)) {
    console.error('Usage: node createFiles.js <number>');
    process.exit(1);
}

// Define the file names
const fileNames = [`index.mjs`, `input`];

// Create the folder
fs.mkdir(folderName, { recursive: true }, (err) => {
    if (err) {
        return console.error(`Error creating folder: ${err.message}`);
    }
    console.log(`Folder "${folderName}" created successfully.`);

    // Create the files inside the folder
    fileNames.forEach(fileName => {
        const filePath = path.join(folderName, fileName);
        fs.writeFile(filePath, '', (err) => {
            if (err) {
                return console.error(`Error creating file "${fileName}": ${err.message}`);
            }
            console.log(`File "${fileName}" created successfully in "${folderName}".`);
        });
    });
});
