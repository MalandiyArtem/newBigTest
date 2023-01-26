import {
  Component, ElementRef, Input, TemplateRef, ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabComponent {
  @Input() title = '';
  @Input() isHostTab = false;
  @Input() tabImage: string | undefined;
  @Input() template: TemplateRef<ElementRef> | undefined;
  @Input() dataContext: any;
  @Input() active = false;
  @Input() isCloseable = false;
  @Input() disabled = false;
  @Input() filePath: string | undefined;
}
