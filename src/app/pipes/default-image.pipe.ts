import { Pipe, PipeTransform } from '@angular/core';

export const defaultSrc = 'assets/images/notfound_placeholder.svg';

@Pipe({
  name: 'defaultImage'
})
export class DefaultImagePipe implements PipeTransform {

  transform(src: string): any {
    return (!src || src.toLowerCase()  === 'n/a')
      ? defaultSrc
      : src;
  }

}
