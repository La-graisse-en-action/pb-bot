import chalk from 'chalk';
import { prismaClient } from '../db/prisma.js';
import { ApiResponse } from '../types/ApiResponse.js';

export const getUser = async (id: string) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) {
      console.log(chalk.yellow(`- User with ID ${id} not found in the database`));
      return {
        data: null,
        status: 'error',
        message: `User with ID ${id} not found`,
        hasError: true,
        error: `User with ID ${id} does not exist in the database`,
      } as ApiResponse<null>;
    }

    console.log(chalk.green(`- User retrieved: ${user.name} (ID: ${user.id})`));
    return {
      data: user,
      status: 'success',
      message: 'User retrieved successfully',
      hasError: false,
      error: undefined,
    } as ApiResponse<typeof user>;
  } catch (error) {
    console.error(`Error retrieving user: ${error}`);
    return {
      data: null,
      status: 'error',
      message: 'Failed to retrieve user',
      hasError: true,
      error: error instanceof Error ? error.message : 'Unknown error',
    } as ApiResponse<null>;
  }
};
