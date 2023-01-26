import { Component, OnInit } from '@angular/core';
import { ViewersService } from '../../services/viewers.service';
import { IViewerInfo } from '../../../interfaces/viewerInfo.interface';

@Component({
  selector: 'app-viewers',
  templateUrl: './viewers.component.html',
  styleUrls: ['./viewers.component.scss'],
})
export class ViewersComponent implements OnInit {
  viewersInfo: IViewerInfo[] = [];

  constructor(private viewersService: ViewersService) {
  }

  ngOnInit(): void {
    this.viewersInfo = this.viewersService.getViewerListInfo();
  }
}
