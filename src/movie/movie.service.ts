import { Movie, MovieDocument } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService, Injectable } from '@nestjs/common';
import { createMovieDTO } from './dto/createMovieDto';
import { ConfigService } from '@nestjs/config';
import { ITMDBMovieDetail } from './intefaces/ITMDBMovieDetail';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MovieService {

    private API_KEY: string;

    constructor(
        @InjectModel(Movie.name) private MovieModel: Model<MovieDocument>,
        private readonly config: ConfigService,
        private readonly httpService: HttpService,
    ) {
        this.API_KEY = this.config.get("TMDB_API_KEY");
    }

    async saveMovieDetails() {

        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.API_KEY}&sort_by=release_date.asc&vote_count.gte=1500&vote_average.gte=8.4&with_watch_providers=8&watch_region=TR`;
        
        const response = await lastValueFrom(this.httpService.get(url));

        //Early exit
        if (response.status !== 200) {
            return false;
        }

        const payload = <any[]>response.data.results;

        const moviesIds = payload.map(function (data) {
            return <number>data.id;
        });

        let movieDetails = [];

        for await (const moviesId of moviesIds) {
            let moveiDetail = await this.fetchMovieDetail(moviesId);

            if (!moveiDetail) {
                break;
            }
            
            const moveiDetailData = {
                name: moveiDetail.title,
                overview: moveiDetail.overview,
                popularity: moveiDetail.popularity,
                voteAverage: moveiDetail.vote_average,
                voteCount: moveiDetail.vote_count,
                releaseDate: moveiDetail.release_date,
                genre: moveiDetail.genres,
            };

            movieDetails.push(moveiDetailData);
        }

        await this.MovieModel.insertMany(movieDetails);
    }

    async save(movie: createMovieDTO): Promise<Movie> {
        return await this.MovieModel.create(movie);
    }

    async findById(id: string): Promise<Movie> {
        return await this.MovieModel.findById(id).exec();
    }

    async findAll(): Promise<Movie[]> {
        return await this.MovieModel.find({}).exec();
    }

    async removeById(id: string): Promise<any> {
        return await this.MovieModel.deleteOne({ "_id": id }).exec();
    }

    private async fetchMovieDetail(movieID: number) {

        const url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${this.API_KEY}`;

        const response = await lastValueFrom(this.httpService.get(url));

        //Early exit
        if (response.status !== 200) {
            return false;
        }

        const payload = <ITMDBMovieDetail>(response.data);

        return payload;
    }

}
