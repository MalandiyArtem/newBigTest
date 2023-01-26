import { Injectable } from '@angular/core';
import { IViewerInfo } from '../../interfaces/viewerInfo.interface';

@Injectable({
  providedIn: 'root',
})
export class ViewersService {
  // unused code 
  private viewerList = [];

  getViewerListInfo(): IViewerInfo[] {
    return this.viewerList;
  }
}
