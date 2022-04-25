import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { createMovieDTO } from './dto/createMovieDto';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {

    constructor(
        private movieService: MovieService
    ) { }

    @Post("/get-movie-details")
    async  getMovieDetails() {
        return await this.movieService.saveMovieDetails();
    }

    @Get()
    async findAll(){
        return await this.movieService.findAll();
    }

    @Post()
    async create(@Body() movie: createMovieDTO) {
        return await this.movieService.save(movie);
    }

    @Get("/:id")
    async findById(@Param("id") id: string) {
        return await this.movieService.findById(id);
    }

    @Delete("/:id")
    async removeById(@Param("id") id: string) {
        return await this.movieService.removeById(id);
    }

}