import { Message } from '@prisma/client';
import { prismaClient } from '../db/prisma.js';
import { ApiResponse } from '../types/ApiResponse.js';
import chalk from 'chalk';

export const postMessageByUserId = async (userId: string, message: string) => {
  try {
    console.log(chalk.blue(`- Posting message for user ${userId}: ${message}`));
    const messageCreated = await prismaClient.message.create({
      data: {
        userId,
        content: message,
        createdAt: new Date(),
      },
    });

    console.log(chalk.green(`- Message posted successfully for user ${userId}`));
    return {
      data: messageCreated,
      status: 'success',
      message: 'Message posted successfully',
      hasError: false,
      error: undefined,
    } as ApiResponse<Message>;
  } catch (error) {
    console.error(`Error posting message for user ${userId}: ${error}`);
    return {
      data: null,
      status: 'error',
      message: 'Failed to post message',
      hasError: true,
      error: error instanceof Error ? error.message : 'Unknown error',
    } as ApiResponse<Message | null>;
  }
};
