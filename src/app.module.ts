import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';

const NODE_ENV = ( process.env.NODE_ENV === "test" ||  typeof process.env.NODE_ENV === "undefined" ) ? "development" : process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `.env.${NODE_ENV}`,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
          uri: configService.get<string>('MONGO_DB_URI'),
      }),
      inject: [ConfigService],
    }),
    MovieModule,
  ],
})
export class AppModule {}
