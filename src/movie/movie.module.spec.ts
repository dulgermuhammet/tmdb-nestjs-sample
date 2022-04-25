import { Test } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

describe('Movie', () => {
  let controller: MovieController;

  const mockMovieService = {
    findAll:jest.fn(()=>{
      return Promise.resolve([
        {
          "name": "Schindler's List",
          "overview": "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.",
          "popularity": 49.382,
          "voteAverage": 8.6,
          "voteCount": 12683,
          "releaseDate": "1993-11-30",
          "genre": [
            {
              "id": 18,
              "name": "Drama"
            },
            {
              "id": 36,
              "name": "History"
            },
            {
              "id": 10752,
              "name": "War"
            }
          ],
          "id": "62661f4369e71be5e11efba2"
        }
      ])
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [MovieService],
    })
      .overrideProvider(MovieService)
      .useValue(mockMovieService)
      .compile();

    controller = moduleRef.get<MovieController>(MovieController);
  });

  it("Sholud be defined", () => {
    expect(controller).toBeDefined();
  });

  it("Get All Movies", async () => {
    expect(await controller.findAll()).toEqual([{
      "id": expect.any(String),
      "name": expect.any(String),
      "overview": expect.any(String),
      "popularity": expect.any(Number),
      "voteAverage": expect.any(Number),
      "voteCount": expect.any(Number),
      "releaseDate": expect.any(String),
      "genre": expect.any(Array),
    }]
    );
  });


});
