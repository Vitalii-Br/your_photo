
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
// extends     -  расширяется
// implements  -  реализует
// connect     -  соединяeт


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    const maxRetries = 10; // Количество попыток
    const delayMs = 2000; // Задержка между попытками
    for (let i = 0; i < maxRetries; i++) {
      try {
        console.log(`Attempting to connect to the database (Try: ${i + 1})`);
        await this.$connect();
        console.log('Соединение с базой данных установлено.');
        break;
      } catch (error) {
        console.error('Не удалось подключиться к базе данных. Повторная попытка через 2 секунды...');
        if (i === maxRetries - 1) {
          throw new Error(
            'Unable to connect to the database. Please ensure the database is running and accessible.'
          );
        }
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}




// ------------------------------------------

// export class PrismaService extends PrismaClient implements OnModuleInit {
//   async onModuleInit() {
//     await this.$connect();
//   }
// }


