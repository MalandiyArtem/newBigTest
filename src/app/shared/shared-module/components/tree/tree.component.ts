import {
  ChangeDetectorRef, Component, ElementRef, Input,
  OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild,
} from '@angular/core';
import { first } from 'rxjs';
import { Guid } from 'guid-typescript';
import { ITree } from '../../../interfaces/tree.interface';
import { TabsComponent } from '../tabs/tabs.component';
import { ConvergenceService } from '../../services/convergence.service';
import { TreeService } from '../../services/tree.service';
import { ActiveFileService } from '../../services/active-file.service';
import {
  TreeObjectType,
} from '../../../interfaces/Records/tree-object-type';
import { RecordTreeService } from '../../services/record-tree.service';
import { FileContentService } from '../../services/file-content.service';
import { FileForRecord } from '../../../interfaces/Records/file-for-record';
import { ActiveStreamService } from '../../services/active-stream.service';
import { StreamType } from '../../../enums/stream-type';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnChanges, OnInit {
  @Input() treeData: ITree[] = [];
  @Input() tabsComponent: TabsComponent | undefined;
  @ViewChild('newTab') newTabTemplate: TemplateRef<ElementRef> | undefined;
  streamId: Guid = Guid.createEmpty();
  streamType: StreamType = StreamType.Undefined;

  activePath: string | undefined;
  code = '';

  constructor(
    private treeService: TreeService,
    private activeFileService: ActiveFileService,
    private convergenceService: ConvergenceService,
    private cdr: ChangeDetectorRef,
    private recordTreeService: RecordTreeService,
    private fileContentService: FileContentService,
    private activeStreamService: ActiveStreamService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const keys = Object.keys(changes);
    keys.forEach((key) => {
      if (changes[key].currentValue instanceof TabsComponent) {
        this.tabsComponent = changes[key].currentValue;
      }
    });
  }

  toggleChild(node: ITree) {
    node.showChildren = !node.showChildren;
    if (node.type === TreeObjectType.Blob && this.newTabTemplate) {
      const fileFOrRecordResponseSubscribe = this.recordTreeService
        .getFileForRecord(this.streamId, node.url)
        .subscribe(
          (value: FileForRecord) => {
            this.code = this.fileContentService.decodeContent(value.content, value.encoding);
            fileFOrRecordResponseSubscribe.unsubscribe();
          },
        );
      this.activeFileService.setActiveFile(node.relativePath);
      this.tabsComponent?.openTab(node.name, node.relativePath, this.newTabTemplate, {}, true);
    }
  }

  ngOnInit(): void {
    this.activeStreamService.getStreamType()
      .subscribe((value) => this.streamType = <StreamType>value);
    this.activeStreamService.getStreamId().subscribe((value) => this.streamId = <Guid>value);

    if (this.streamType === StreamType.Stream) {
      this.convergenceService.getActiveHostStreamPath().pipe(first()).subscribe((path) => {
        this.activeFileService.setActiveFile(path);
      });
    }

    this.activeFileService.getActiveFile().subscribe((path) => {
      this.activePath = path;
      this.cdr.detectChanges();
    });
  }
}
