import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from './create-notification-body';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) { }

  @Get('notifications')
  list() {
    return this.prisma.notifications.findMany();
  }

  @Post('notifications')
  async create(@Body() body: CreateNotificationBody) {
    const { categories, content, recipientId } = body;

    await this.prisma.notifications.create({
      data: {
        id: randomUUID(),
        content,
        categories,
        recipientId,
      },
    });
  }
}
