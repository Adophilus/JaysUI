let chalk = require('chalk')

class Console {
  log(arg: string) {
    console.log(arg)
  }
  success(arg: string) {
    console.log(chalk.green(`[+]`), arg)
  }
  err(arg: string) {
    console.log(chalk.red(`[-]`), arg)
  }
  info(arg: string) {
    console.log(chalk.blue(`[?]`), arg)
  }
  warn(arg: string) {
    console.log(chalk.yellow(`[!]`), arg)
  }
}

module.exports = new Console()
