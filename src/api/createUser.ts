import chalk from 'chalk';
import { prismaClient } from '../db/prisma.js';
import { ApiResponse } from '../types/ApiResponse.js';
import { User } from '@prisma/client';

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
    return {
      data: userCreated,
      status: 'success',
      message: 'User created successfully',
      hasError: false,
      error: undefined,
    } as ApiResponse<User>;
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    return {
      data: null,
      status: 'error',
      message: 'Failed to create user',
      hasError: true,
      error: error instanceof Error ? error.message : 'Unknown error',
    } as ApiResponse<User | null>;
  }
};
