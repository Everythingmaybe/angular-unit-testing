import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MoviesService } from './movies.service';
import { environment } from '../../environments/environment';
import { MovieParamsInterceptor } from '../http-interceptors/movie-params.interceptor';

describe('MoviesService', () => {
  let http: HttpTestingController;
  let service: MoviesService;

  const movie = {
    Title: 'The Fast and the Furious',
    imdbID: 'tt0232500',
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

  it(`Должен получить фильм "The Fast and the Furious" по ID: tt0232500`, () => {
    service.getMovie(movie.imdbID).subscribe((mov) => {
      expect(mov.Title).toEqual(movie.Title);
    });

    // http://www.omdbapi.com?i=tt0232500&apikey=e5d9d5eb
    const req = http.expectOne(`${environment.apiUrl}?i=${movie.imdbID}&apikey=${environment.apiKey}`);
    expect(req.request.method).toEqual('GET');
    req.flush(movie);
  });

  it(`Должен получить фильмы только с "The Fast and the Furious" в названии`, () => {
    service.searchMovies(movie.Title).subscribe((movies) => {
      expect(movies.length && movies.every((mov) => mov.Title.includes(movie.Title))).toBeTruthy();
    });

    const titleToUrl: string = movie.Title.replace(/\s/g, '%20');
    const req = http.expectOne(`${environment.apiUrl}?s=${titleToUrl}&apikey=${environment.apiKey}`);
    expect(req.request.method).toEqual('GET');
    req.flush({ Search: [ movie, movie ] });
  });
});
