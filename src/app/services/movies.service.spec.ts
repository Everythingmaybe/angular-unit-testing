import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MovieParamsInterceptor} from '../http-interceptors/movie-params.interceptor';

describe('MoviesService', () => {
  let http: HttpTestingController;
  let service: MoviesService;

  const movie = {
    Title: "The Fast and the Furious",
    imdbID: "tt0232500",
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ MoviesService, {
        provide: HTTP_INTERCEPTORS,
        useClass: MovieParamsInterceptor,
        multi: true,
      }],
    });

    http = TestBed.get(HttpTestingController);
    service = TestBed.get(MoviesService);
  });

  afterEach(() => {
    http.verify();
  });

  it('Должен быть создан', () => {
    expect(service).toBeTruthy();
  });

  it('Должен получить фильм', () => {
    service.getMovie(movie.imdbID).subscribe((mov) => {
      expect(mov.Title).toEqual(movie.Title);
    });

    // http://www.omdbapi.com/?i=tt0232500&plot=full&apikey=e5d9d5eb
    const req = http.expectOne('http://www.omdbapi.com/?i=tt0232500&plot=full&apikey=e5d9d5eb');
    expect(req.request.method).toEqual('GET');
    req.flush(movie);
  });
});
