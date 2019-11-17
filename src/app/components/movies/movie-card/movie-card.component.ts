import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShortMovieInfo } from '../../../models/short-movie-info';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: ShortMovieInfo;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  openMovie(id: string): void {
    this.router.navigateByUrl(`movie/${id}`);
  }

}
