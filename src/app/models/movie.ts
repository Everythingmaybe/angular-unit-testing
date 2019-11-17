export interface Movie {
  Actors: string
  Awards: string
  BoxOffice: string
  Country: string
  DVD: string | Date,
  Director: string
  Genre: string
  Language: string
  Metascore: string | number
  Plot: string
  Poster: string
  Production: string
  Rated: string
  Ratings: Rating[]
  Released: string | Date
  Response: string | boolean
  Runtime: string
  Title: string
  Type: string
  Website: string
  Writer: string
  Year: string | number
  imdbID: string
  imdbRating: string | number
  imdbVotes: string | number
}

interface Rating {
  Source: string,
  Value: string,
}
