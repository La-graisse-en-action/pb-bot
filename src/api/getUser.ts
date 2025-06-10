import chalk from 'chalk';
import { prismaClient } from '../db/prisma.js';

export const getUser = async (id: string) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) {
      console.log(chalk.yellow(`- User with ID ${id} not found in the database`));
      return null;
    }

    console.log(chalk.green(`- User retrieved: ${user.name} (ID: ${user.id})`));
    return user;
  } catch (error) {
    console.error(`Error retrieving user: ${error}`);
    return null;
  }
};
