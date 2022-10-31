const chalk = require('chalk')

module.exports = {
  error(message) {
    console.error(chalk.red(`${message}`))
  },
  info(message) {
    console.log(chalk.blue(`${message}`))
  },
  success(message) {
    console.log(chalk.green(`${message}`))
  },
  warn(message) {
    const warnColor = chalk.keyword('orange')
    console.log(warnColor(message))
  },
}
