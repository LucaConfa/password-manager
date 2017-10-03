let argv = require('yargs')
  .command('hello', 'greets the user', (yargs) => {
    yargs.options({
      name: {
        demand: true,
        alias: 'n',
        description: 'Your first name goes here'
      },
      lastname: {
        demand: true,
        alias: 'l',
        description: 'Your last name goes here'
      }
    }).help('help');
  })
  .help('help')
  .argv;
let command = argv._[0];

if(command === 'hello' && 
typeof argv.name !== 'undefined' && typeof argv.lastname !== 'undefined'){
  console.log(`Hello ${argv.name} ${argv.lastname}`);
} else if(command === 'hello' && typeof argv.name !== 'undefined') {
  console.log('Hello '+ argv.name);
} else if (command === 'hello') {
  console.log('Hellow World');
}