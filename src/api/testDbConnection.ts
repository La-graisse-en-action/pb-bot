import chalk from 'chalk';
import { prismaClient } from '../db/prisma.js';

export async function testDBConnection() {
  try {
    await prismaClient.$connect();
    console.log('\n');
    console.log(chalk.bgGreen('Database connection successful'));
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
  }
}
