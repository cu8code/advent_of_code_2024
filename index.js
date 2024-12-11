const fs = require('fs');
const path = require('path');

const folderName = process.argv[2];

if (!folderName || isNaN(folderName)) {
    console.error('Usage: node createFiles.js <number>');
    process.exit(1);
}

const fileNames = [`main.mjs`, `input`];

fs.mkdir(folderName, { recursive: true }, (err) => {
    if (err) {
        return console.error(`Error creating folder: ${err.message}`);
    }
    console.log(`Folder "${folderName}" created successfully.`);

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
