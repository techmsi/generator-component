var chalk = require('chalk'),
    _ = require('lodash');

module.exports = function (props) {
  var msg = '';

  for (var key in props) {
    msg += '\n' + _.startCase(key) + ':\t' + props[key];
  }

  console.log(
    chalk.yellow(
    '\n---- DETAILS ----',
    msg, '\n'
  ));
};
