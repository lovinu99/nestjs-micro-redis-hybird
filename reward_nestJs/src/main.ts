import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

const microserviceOptions = {
  name: 'REWARD_SERVICE',
  transport: Transport.REDIS,
  options: {
    url: 'redis://localhost:6379',
  },
};

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  // microservice #2
  const microserviceRedis = app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    });

  await app.startAllMicroservices();
  await app.listen(3333);
}
bootstrap();
