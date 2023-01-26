import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { CONSTANTS } from '../../../constants';
import { RemoteFileTextInterface } from '../../../interfaces/Github/remoteFileText.interface';
import { FileContentService } from '../file-content.service';
import { FileContentInterface } from '../../../interfaces/Records/file-content.interface';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private textOfFile$ = new BehaviorSubject<FileContentInterface | null>(null);

  constructor(private http: HttpClient, private fileContentService: FileContentService) { }

  sendRequestToGetRemoteFileText(
    pathToFile:string,
    commitHash: string,
    ownerName: string,
    repoName: string,
  ) {
    const url = CONSTANTS.URLS.GITHUB.GET_FILE_TEXT
      .replace('{ownerName}', ownerName)
      .replace('{repoName}', repoName)
      .replace('{pathToFile}', pathToFile.replace('//', '%2F'))
      .replace('{hash}', commitHash);

    this.http.get<RemoteFileTextInterface>(url).subscribe((data) => {
      const textOfFile = this.fileContentService.decodeContent(data.content, data.encoding);

      const response = {
        text: textOfFile,
        fileName: data.name,
        path: data.path,
      };

      this.textOfFile$.next(response);
    });
  }

  getRemoteTextOfFile() {
    return this.textOfFile$ as Observable<FileContentInterface>;
  }

  getTextForRewind(
    fileName:string,
    commitHash: string,
    ownerName: string,
    repoName: string,
  ) {
    const url = CONSTANTS.URLS.GITHUB.GET_FILE_TEXT
      .replace('{ownerName}', ownerName)
      .replace('{repoName}', repoName)
      .replace('{pathToFile}', fileName.replace('//', '%2F'))
      .replace('{hash}', commitHash);

    return firstValueFrom(this.http.get<RemoteFileTextInterface>(url));
  }
}
