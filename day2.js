const fs = require('fs');

function parseLists(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8'); // Read file content
    const lines = content.trim().split('\n');          // Split into lines
    const left = [];
    const right = [];

    lines.forEach(line => {
        const [leftNum, rightNum] = line.split(/\s+/).map(Number); // Split by whitespace and cast as Number
        left.push(leftNum);
        right.push(rightNum);
    });

    return { left, right };
}

function simScore({left, right}) {

    return left.reduce((simScore, x) => 
        (right.reduce((matchesToX, y) => matchesToX + (x===y), 0) * x) + simScore, 0)
}

const { left, right } = parseLists('day1.txt');
console.log(simScore({left, right}));