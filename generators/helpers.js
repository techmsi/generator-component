var chalk = require('chalk'),
    _ = require('lodash');

module.exports =
{
  printPromptDetails: function (props) {
    var msg = '';

    for (var key in props) {
      msg += '\n' + _.startCase(key) + ':\t' + props[key];
    }

    console.log(
      chalk.yellow(
      '\n---- DETAILS ----',
      msg, '\n'
    ));

  },
  // Creates Css files for the specified ranges
  createCss: function (self, dir, data) {
    var newData = (data.desktopOnlyDisplay) ? _.omit(data, 'desktopOnlyDisplay') : data;

    if (self.props.mediaQuery) {
      self.template('_all.css', dir + '/' + '0-' + self.props.mobileRange + '.css', newData);
      self.template('_all.css', dir + '/' + self.props.mobileRange + '-' + self.props.tabletRange + '.css', newData);
      self.template('_all.css', dir + '/' + self.props.tabletRange + '+' + '.css', data);
    } else if (dir !== 'undefined') {
      // No media queries required but context required
      self.template('_all.css', dir + '/all.css', data);
    } else {
      // No media queries required
      self.template('_all.css', self.componentDir + '/all.css', data);
    }

  }
};
