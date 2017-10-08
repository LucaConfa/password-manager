let storage = require('node-persist');
storage.initSync();

let argv = require('yargs')
  .command('create', 'Create an account', (yargs) => {
    yargs.options({
      name: {
        demand: true,
        alias: 'n',
        description: 'Account name, example: twitter, facebook',
        type: 'string'
      },
      username: {
        demand: true,
        alias: 'u',
        description: 'Account username or email',
        type: 'string'
      },
      password: {
        demand: true,
        alias: 'p',
        descritpion: 'Account password',
        type: 'string'
      }
    }).help('help');
  })
  .command('get', 'Get an existing account', (yargs) => {
    yargs.options({
      name: {
        demand: true,
        alias: 'n',
        description: 'Account name, example: twitter, facebook',
        type: 'string'
      }
    }).help('help');
  })
  .help('help')
  .argv;

let command = argv._[0];

/**
 * Create account
 * 
 * @param {any} account 
 * account: {
 *  name: 
 *  username:
 *  password
 * }
 */
function createAccount(account) {
  var accounts = storage.getItemSync('accounts');

  if (typeof accounts === 'undefined') {
    accounts = [];
  }

  accounts.push(account);
  storage.setItemSync('accounts', accounts);
  return account;
}

/**
 * Get account by name
 * 
 * @param {any} accountName 
 * @returns 
 */
function getAccount(accountName) {
  var accounts = storage.getItemSync('accounts');
  var mathcedAccount;
  accounts.forEach(account => {
    if (account.name === accountName) {
      mathcedAccount = account;
    }
  });
  return mathcedAccount;
}

switch (command) {
case 'create':
  var accountCreated = createAccount({
    name: argv.name,
    username: argv.username,
    password: argv.password
  });
  console.log('Account created', accountCreated);
  break;
case 'get':
  var fetchedAccount = getAccount(argv.name);
  if (typeof fetchedAccount == 'undefined') {
    console.log('Account not found');
  } else {
    console.log('Account found', fetchedAccount);
  }
}