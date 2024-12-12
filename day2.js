const fs = require('fs');

function parseReports(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8'); // Read file content
    const lines = content.trim().split('\n');          // Split into lines
    const reports = [];

    lines.forEach(line => {
        const report = line.split(/\s+/).map(Number); // Split by whitespace and cast as Number
        reports.push(report);
    });

    return reports;
}

function checkSafety (arr) {
    let monotonic = true, gradDiff = true, skipUsed = false;
    const ascending = arr[1] > arr[0];
    
    for (let i = 1; i < arr.length && monotonic && gradDiff; i++) {
        const diff = arr[i] - arr[i - 1];
        monotonic = ascending ? diff > 0 : diff < 0;
        gradDiff = gradDiff && Math.abs(diff) >= 1 && Math.abs(diff) <= 3;
        
    }

    return monotonic && gradDiff;
}

function testSafety (reportList) {
    return reportList.reduce((safeReps, report) => (checkSafety(report)) + safeReps, 0);
}

const day2Reports = parseReports('C:/Users/yiwan/Documents/Christie/Code/2024adventofcode/input/day2.txt');
console.log(testSafety(day2Reports));