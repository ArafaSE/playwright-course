const yargs = require('yargs')
const { exec } = require('child_process');

const argv = yargs.argv

let command = `npx playwright test`

switch(argv.mode){
    case 'hp':
        command += ` --grep-invert @wip --grep @hp`
        break;
    case 'regression':
        command += ` --grep-invert @wip --grep @regression`
        break;
    case 'full':
        break;
    default: 
        command += ` --grep-invert @wip`
        break;
}

if(argv.browser) command += ` --project=${argv.browser}`;

console.log('Executing command: ' + command);

exec(command, (error, stdout, stderr) => {
    if(error){
        console.log(`error: ${error.message}`)
        return;
    }
    if(stderr){
        console.log(`stderr: ${stderr}`)
        return;
    }
    console.log(`stdout: ${stdout}`)
})