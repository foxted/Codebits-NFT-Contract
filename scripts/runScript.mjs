#!/usr/bin/env zx

const path = require('path');
const fs = require('fs');
const mintNft = require('./mintNft');
const metadata = require('../data/metadata.json');

const asyncForEach = async function(array, callback) {
    for (let index in array) {
        await callback(array[index], index, array);
    }
}

const baseDomain = 'https://codebits.rocks';

const tmp = metadata.reduce((acc, item) => {
    acc[item.dna] = item;
    return acc;
}, {});

await asyncForEach(Object.entries(tmp), async ([key, value]) => {
    try {
        console.log(chalk.blue(`Minting ${key}...`));
        const url = `${baseDomain}/${key}.json`;
        await mintNft(url);
        console.log(chalk.green('Minted!'));
        console.log('URL:', url);
        console.log('\n');
    } catch(e) {
        console.error(chalk.red(`Error minting ${key}: ${e.message}`));
        process.exit(1);
    }
});

console.log(chalk.green('Done!'));
process.exit(0);

// pinFileToIPFS(filePath);
