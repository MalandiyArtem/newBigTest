import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { CONSTANTS } from '../../constants';
import { FileTreeForRecord } from '../../interfaces/Records/file-tree-for-record';
import { FileForRecord } from '../../interfaces/Records/file-for-record';

@Injectable({
  providedIn: 'root',
})
export class RecordTreeService {
  constructor(private http: HttpClient) {
  }

  async getTreeForRecord(recordId: Guid) {
    return this.http
      .get<FileTreeForRecord>(
      `${CONSTANTS.URLS.LIVECODE_ENDPOINTS.GET_TREE_FOR_RECORD}?Id=${recordId.toString()}`,
      {
        headers: {
          'Content-type': 'application/json',
        },
      },
    );
  }

  getFileForRecord(recordId: Guid, fileUrl: string) {
    return this.http
      .get<FileForRecord>(
      `${CONSTANTS.URLS.LIVECODE_ENDPOINTS.GET_FILE_FOR_RECORD}?Id=${recordId.toString()}&FileUrl=${fileUrl}`,
      {
        headers: {
          'Content-type': 'application/json',
        },
      },
    );
  }
}
