import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ShortMovieInfo } from '../models/short-movie-info';
import {Movie} from '../models/movie';

interface searchResponse {
  Response: string | boolean,
  Search: ShortMovieInfo[],
  totalResults?: string | number,
  Error?: string,
}

@Injectable()
export class MoviesService {

  constructor(
    private http: HttpClient,
  ) { }

  getMovie(id: string, fullInfo?: boolean ): Observable<Movie> {
    return this.http.get<Movie>(environment.apiUrl, { params: {
        i: id,
        ...(fullInfo  && { plot: 'full' }),
      }
    });
  }

  searchMovies(title: string): Observable<ShortMovieInfo[]> {
    return this.http.get<searchResponse>(environment.apiUrl, { params: { s: title } })
      .pipe(map((response) => response.Search || []));
  }
}
