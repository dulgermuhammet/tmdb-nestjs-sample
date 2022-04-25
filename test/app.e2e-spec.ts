import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AppModule } from '../src/app.module';

describe('App', () => {
  let app: INestApplication;
  let connection: Connection;
  let httpServer: any;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    connection = await moduleRef.get(getConnectionToken());
    app = moduleRef.createNestApplication();
    httpServer = app.getHttpServer();
    await app.init();
  });

  it(`(/GET) -> Get All Movies`, async () => {

    const response = await request(httpServer).get('/movies');

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: expect.any(String) }),
        expect.objectContaining({ overview: expect.any(String) }),
        expect.objectContaining({ popularity: expect.any(Number) }),
        expect.objectContaining({ voteAverage: expect.any(Number) }),
        expect.objectContaining({ voteCount: expect.any(Number) }),
        expect.objectContaining({ releaseDate: expect.any(String) }),
        expect.objectContaining({ genre: expect.any(Array) }),
        expect.objectContaining({ id: expect.any(String) }),
      ])
    );

  });

  afterAll(async () => {
    await connection.close(true);
    await app.close();
  });

});