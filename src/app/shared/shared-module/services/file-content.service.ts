import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileContentService {
  decodeContent(content: string, encodingType: string) : string {
    console.log(content, encodingType);
    return 'false';
  }



  myFunc() {
    console.log('Help');
  }
}
