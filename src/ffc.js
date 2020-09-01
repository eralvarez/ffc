#!/usr/bin/env node
const yargs = require('yargs');
const config = require('./config');
const fileGenerator = require('./file_generator');

const argv = yargs
    .usage('usage: $0 <command>')
    // .option('config', {
    //     type: 'string',
    //     default: 'ffcconfig.json',
    //     description: 'FFC config file'
    // })
    .usage('usage: $0 generate <any> <name> [options]')
    .command(['generate', 'g'], '', (yargs) => {
        const ffcConfig = config.getConfig();
        for (const command of ffcConfig.commands) {
            yargs = yargs.command(command.command, `-  Create a new ${command.command[0]}`, (yargs) => {
                // console.log(_argv);
                const componentPath = _argv._[2].split('/').filter(_ => _).join('/');
                const folderStyle = (command.folderStyle) ? command.folderStyle : '';
                fileGenerator.createFiles(componentPath, command.schematic, folderStyle, _argv.flat);
            });
        }
        _argv = yargs
            .usage('usage: $0 generate <any> <name> [options]')
            .option('flat', {
                alias: 'f',
                type: 'boolean',
                default: false,
                description: 'Create files without container folder'
            })
            .help('help')
            .wrap(null)
            .argv
        
        checkCommands(yargs, _argv, 2)
    })
    .help('help')
    .wrap(null)
    .argv

checkCommands(yargs, argv, 1)

function checkCommands(yargs, argv, numRequired) {
    if (argv._.length < numRequired) {
        yargs.showHelp()
    } else {
        // check for unknown command
    }
}
