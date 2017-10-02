let storage = require('node-persist');
storage.initSync();

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
function createAccount (account) {
  var accounts = storage.getItemSync('accounts');

  if(typeof accounts === 'undefined'){
    accounts = [];
  }

  accounts.push(account);
  storage.setItemSync('accounts',accounts);
}

/**
 * Get account by name
 * 
 * @param {any} accountName 
 * @returns 
 */
function getAccount (accountName) {
  var accounts = storage.getItemSync('accounts');
  var mathcedAccount;
 accounts.forEach(account => {
   if (account.name === accountName) {
    mathcedAccount = account;
   }
 })
  return mathcedAccount
}

// createAccount({
//   name: "Facebook",
//   username: "Luca@luca.com",
//   password: "123!"
// });

var facebookAccount = getAccount('Facebook');
console.log(facebookAccount);