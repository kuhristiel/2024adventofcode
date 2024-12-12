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
    let ascending = true, descending = true, differBy1 = true, differBy3 = true;
    for (let i = 1; i < arr.length && (ascending || descending) && differBy1 && differBy3; i++) {
        ascending = ascending && arr[i] > arr[i-1];
        descending = descending && arr[i] < arr[i-1];
        differBy1 = differBy1 && Math.abs(arr[i] - arr[i-1]) >= 1;
        differBy3 = differBy3 && Math.abs(arr[i] - arr[i-1]) <= 3;
    }
    return (ascending || descending) && differBy1 && differBy3;
}

function testSafety (reportList) {
    return reportList.reduce((safeReps, report) => (checkSafety(report)) + safeReps, 0);
}

const day2Reports = parseReports('C:/Users/yiwan/Documents/Christie/Code/2024adventofcode/input/day2.txt');
console.log(testSafety(day2Reports));