import { HttpModule, Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schemas/movie.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule {}
