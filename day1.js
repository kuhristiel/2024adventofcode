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

function distLists( {left, right} ) {
    let dist = 0;
    
    // Order each list by smallest to largest
    const sortedLeft = left.sort();
    const sortedRight = right.sort(); 

    // Pair each set
    for(let i = 0; i < sortedLeft.length; i++) {
        let pairDist = Math.abs(sortedLeft[i] - sortedRight[i]);
        dist = dist + pairDist;
    }

   return dist;
}

function simScore({left, right}) {

    return left.reduce((simScore, x) => 
        (right.reduce((matchesToX, y) => matchesToX + (x===y), 0) * x) + simScore, 0)
}

// Example usage
const { left, right } = parseLists('C:/Users/yiwan/Documents/Christie/Code/2024adventofcode/input/day1.txt');
console.log(distLists({left, right}));
console.log(simScore({left, right}));