let storage = require('node-persist');
let crypto = require('crypto-js');

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
      },
      masterPassword: {
        demand: true,
        alias: 'm',
        descritpion: 'Master password',
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
      },
      masterPassword: {
        demand: true,
        alias: 'm',
        descritpion: 'Master password',
        type: 'string'
      }
    }).help('help');
  })
  .help('help')
  .argv;

let command = argv._[0];

/**
 * 
 * 
 * @param {any} account 
 * @param {any} masterPassword 
 * @returns 
 */
function createAccount(account, masterPassword) {
  var accounts = getAccounts(masterPassword);

  if (typeof accounts === 'undefined') {
    accounts = [];
  }

  accounts.push(account);
  saveAccounts(accounts, masterPassword);
  return account;
}

/**
 * 
 * 
 * @param {any} accountName 
 * @param {any} masterPassword 
 * @returns 
 */
function getAccount(accountName, masterPassword) {
  var accounts = getAccounts(masterPassword);
  var mathcedAccount;
  accounts.forEach(account => {
    if (account.name === accountName) {
      mathcedAccount = account;
    }
  });
  return mathcedAccount;
}

/**
 * 
 * 
 * @param {any} masterPassword 
 * @returns 
 */
function getAccounts(masterPassword) {
  let accounts = [];
  let encryptedAccounts = storage.getItemSync('accounts');
  if(typeof encryptedAccounts != 'undefined') {
    let bytes = crypto.AES.decrypt(encryptedAccounts, masterPassword);
    accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
  }

  return accounts;
}

/**
 * 
 * 
 * @param {any} accounts 
 * @param {any} masterPassword 
 * @returns 
 */
function saveAccounts(accounts, masterPassword) {
  let encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
  storage.setItemSync('accounts', encryptedAccounts.toString());

  return accounts;
}

switch (command) {
case 'create':
  var accountCreated = createAccount({
    name: argv.name,
    username: argv.username,
    password: argv.password,
  }, argv.masterPassword);
  console.log('Account created', accountCreated);
  break;
case 'get':
  var fetchedAccount = getAccount(argv.name, argv.masterPassword);
  if (typeof fetchedAccount == 'undefined') {
    console.log('Account not found');
  } else {
    console.log('Account found', fetchedAccount);
  }
}