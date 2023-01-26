import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent {
  @Input() viewerName = '';
  @Input() canEdit: boolean | undefined;
}
