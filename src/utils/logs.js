const chalk = require('chalk')

const log = (param) => console.log(param)
module.exports = {
  error(message) {
    console.error(chalk.red(`${message}`))
  },
  info(message) {
    log(chalk.blue(`${message}`))
  },
  success(message) {
    log(chalk.green(`${message}`))
  },
  warn(message) {
    const warnColor = chalk.keyword('orange')
    log(warnColor(message))
  },
}
