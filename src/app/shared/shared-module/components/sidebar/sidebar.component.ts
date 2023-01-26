import {
  ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation,
} from '@angular/core';
import { Guid } from 'guid-typescript';
import { ITree } from '../../../interfaces/tree.interface';
import { TreeService } from '../../services/tree.service';
import { TabsService } from '../../services/tabs.service';
import { FAKE_TREE_DATA } from '../../../constants';
import { TabsComponent } from '../tabs/tabs.component';
import { ActiveStreamService } from '../../services/active-stream.service';
import { StreamType } from '../../../enums/stream-type';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [TreeService],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  @Input() nodes: ITree[] = [];
  streamType: StreamType = StreamType.Undefined;
  streamId: Guid = Guid.createEmpty();
  dynamicTabsComponent: TabsComponent | undefined;

  constructor(
    private treeService: TreeService,
    private tabsService: TabsService,
    private cdr: ChangeDetectorRef,
    private activeStreamService: ActiveStreamService,
  ) {
  }

  ngOnInit(): void {
    this.activeStreamService.getStreamType()
      .subscribe((value) => this.streamType = <StreamType> value);
    this.activeStreamService.getStreamId().subscribe((value) => this.streamId = <Guid> value);
    this.tabsService.getTabComponent()
      .subscribe((tabsComponent: TabsComponent) => this.setTabComponent(tabsComponent));
    if (this.streamType === StreamType.Stream) {
      this.nodes = this.treeService.getTree(
        FAKE_TREE_DATA.PROJECT_TREE,
        FAKE_TREE_DATA.PROJECT_FOLDER,
      );
    }
  }

  private setTabComponent(tabsComponent: TabsComponent) {
    this.dynamicTabsComponent = tabsComponent;
    this.cdr.detectChanges();
  }
}
