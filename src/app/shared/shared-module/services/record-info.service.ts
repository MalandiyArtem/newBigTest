import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from '../../constants';
import { RecordInfo } from '../../interfaces/Records/record-info';

@Injectable({
  providedIn: 'root',
})
export class RecordInfoService {
  constructor(private http: HttpClient) { }

  getRecordInfo(recordId: Guid) {
    return this.http
      .get<RecordInfo>(
      `${CONSTANTS.URLS.LIVECODE_ENDPOINTS.GET_RECORD_INFO}?RecordId=${recordId.toString()}`,
      {
        headers: {
          'Content-type': 'application/json',
        },
      },
    );
  }
}
