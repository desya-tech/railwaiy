import { NestFactory } from '@nestjs/core';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const document = SwaggerModule.createDocument(app, new DocumentBuilder()
  //     .setTitle('VP API')
  //     .setDescription('Virtus Platform DB API')
  //     .build());
  app.enableCors();
  // SwaggerModule.setup('docs', app, document);
  await app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port: ' + 3000);
  });
}
bootstrap();
