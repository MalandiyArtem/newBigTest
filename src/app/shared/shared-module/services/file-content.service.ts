import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileContentService {
  decodeContent(content: string, encodingType: string) : string {
    console.log(content, encodingType);
    return 'false';
  }

  myFunc_2(arg1: number, arg2: number) {
    if (arg1 < arg2) {
      return arg1 + arg2
    } else if (arg1 === arg2) {
      return 0
    } else {
      return arg1 - arg2
    }
  }
}
