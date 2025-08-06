'use strict';

const fs = require('fs');
const axios = require('axios');
const fetch = require('node-fetch');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


/*
 * Complete the 'weatherStation' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING keyword as parameter.
 *
 * Base URL: https://jsonmock.hackerrank.com/api/weather/search?name={keyword}
 *
 */

const fetchData = (keyword) => {
    return fetch(`https://jsonmock.hackerrank.com/api/weather/search?name=${keyword}`)
        .then(response => response.json());
}

const filterData = (data) => {
    const weather = data.weather.match(/(\d+) degree/);
    const wind = data.status[0].match(/Wind: (\d+)Kmph/);
     const humidity = data.status[1].match(/Humidity: (\d+)%/);
     
     return `${data.name},${weather[1]},${wind[1]},${humidity[1]}`;
}

async function weatherStation(keyword) {
        const res = await fetchData(keyword);
        console.log(res);
        return res?.data?.map(ele => filterData(ele));
}
async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const keyword = readLine();

    const result = await weatherStation(keyword);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
