import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public movie$: Observable<Movie> = EMPTY;
  public loading: boolean = true;
  public infoFields: string[] = [
    'Actors',
    'Awards',
    'BoxOffice',
    'Country',
    'DVD',
    'Director',
    'Genre',
    'Language',
    'Metascore',
    'Production',
    'Rated',
    'Released',
    'Runtime',
    'Type',
    'Writer',
    'Year'
  ];

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
  ) {

  }

  ngOnInit() {
    this.movie$ = this.route.params.pipe(
      tap(() => this.loading = true),
      map((params: Params) => params.id),
      switchMap((id: string) => this.moviesService.getMovie(id, true)),
      tap(() => this.loading = false),
    )
  }

}
