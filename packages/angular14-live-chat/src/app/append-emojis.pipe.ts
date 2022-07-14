import { Pipe, PipeTransform } from '@angular/core';
import { Emoji } from 'repo-types/';

@Pipe({
  name: 'appendEmojis'
})
export class AppendEmojisPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    Object.keys(Emoji).forEach(key => value = value.replaceAll(key, Emoji[key]));
    return value;
  }

}
