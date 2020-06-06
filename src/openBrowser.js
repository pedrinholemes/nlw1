var opn = require('opn');

const open = () => opn('http://localhost:3000', {app: 'edge'});
// specify the app to open in 
module.exports = open