import chalk from 'chalk';
import { commands } from '../constants/commands';

export const loadCommandFromMessage = (message: string) => {
  const [cmd] = message.slice(1).toLowerCase().split(/\s+/);
  if (!cmd) {
    console.warn(chalk.yellow('No command detected in the message.'));
    return null;
  }

  console.info(chalk.blue(`- Command detected: ${cmd}`));
  return cmd.startsWith('pb-') && commands[cmd] ? cmd : null;
};
