import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import { DefaultImagePipe } from "../../pipes/default-image.pipe";
import { RouterTestingModule } from "@angular/router/testing";
import { MoviesService } from "../../services/movies.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieComponent, DefaultImagePipe ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ MoviesService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
