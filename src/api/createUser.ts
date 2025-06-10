import chalk from 'chalk';
import { prismaClient } from '../db/prisma.js';

export type DbUser = {
  id: string;
  username: string;
  createdAt?: Date;
};
export const createUser = async ({ id, username, createdAt }: DbUser) => {
  try {
    const userCreated = await prismaClient.user.create({
      data: {
        id,
        name: username,
        createdAt: createdAt || new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(chalk.green(`- User created: ${userCreated.id} - ${userCreated.name}`));
    return userCreated;
  } catch (error) {
    console.error(`Error creating user: ${error}`);
  }
};
