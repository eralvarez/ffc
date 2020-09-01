const path = require('path');
const fs = require('fs');


function getConfig() {
    const ffcConfigPath = path.join(process.cwd(), 'ffcconfig.json');

    if (fs.existsSync(ffcConfigPath)) {
        const config = readFile(ffcConfigPath);
        return config;
    } else {
        const configPath = path.join(process.cwd(), 'package.json');
        if (fs.existsSync(configPath)) {
            const packageContent = readFile(configPath);
            const config = packageContent.ffc;

            return config;
        } else {
            console.error('FFC: you need to place "ffcconfig.json" in your project\'s root folder or place your FFC config in your package.json');
            process.exit(0);
        }
    }
}

function readFile(configPath) {
    try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        return config;
    } catch (error) {
        console.error('FFC: your file should have a valid JSON content');
        process.exit(0);
    }
}

module.exports = {
    getConfig,
};
