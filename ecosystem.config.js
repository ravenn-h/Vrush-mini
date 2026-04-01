const chalk = require('chalk');

const tag = chalk.bgMagenta.white.bold('--- [ Vrush-mini ] ----');

console.log(tag + 'Starting service...');
console.log(chalk.cyan('Loading configuration...'));
console.log(chalk.green('Environment: production'));
console.log(chalk.yellow('DONE SERVER IS ACTIVE \n'));

module.exports = {
  apps: [{
    name: chalk.cyan.bold("vrush-mini"),
    script: "./site.js",
    watch: true,
    ignore_watch: [
      "**/*", 
      "!site.js"
    ],
    autorestart: true,
    max_memory_restart: "800M",
    node_args: "--max-old-space-size=700",
    env: {
      NODE_ENV: "production",
      RESTART_COUNT: "0"
    },
    error_file: "./logs/error.log",
    out_file: "./logs/output.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss",
    combine_logs: true,
    time: true,
    restart_delay: 5000,
    max_restarts: 10,
    min_uptime: "10s",
    wait_ready: true,
    listen_timeout: 30000,
  }]
};