import { Message } from '@prisma/client';
import { ApiResponse } from '../types/ApiResponse.js';
import { prismaClient } from '../db/prisma.js';
import chalk from 'chalk';

export const getMessageByUserId = async (userId: string): Promise<ApiResponse<Message[]>> => {
  try {
    console.log(chalk.blue(`- Retrieving messages for user with ID: ${userId}`));
    const messages = await prismaClient.message.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (messages.length === 0) {
      console.log(chalk.yellow(`- No messages found for user with ID: ${userId}`));
      return {
        data: [],
        status: 'success',
        message: `No messages found for user with ID ${userId}`,
        hasError: false,
        error: undefined,
      };
    }

    console.log(chalk.green(`- Messages retrieved successfully for user with ID: ${userId}`));
    return {
      data: messages,
      status: 'success',
      message: `Messages retrieved successfully for user with ID ${userId}`,
      hasError: false,
      error: undefined,
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      status: 'error',
      message: 'Failed to retrieve messages',
      hasError: true,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
