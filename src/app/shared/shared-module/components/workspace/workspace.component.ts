import {
  AfterViewInit, ChangeDetectorRef, Component, Input,
  OnChanges, OnInit, ViewChild, ViewEncapsulation,
} from '@angular/core';
import { first } from 'rxjs';
import { Guid } from 'guid-typescript';
import { TabsComponent } from '../tabs/tabs.component';
import {
  TabsService,
} from '../../services/tabs.service';
import {
  ConvergenceService,
} from '../../services/convergence.service';
import { ITree } from '../../../interfaces/tree.interface';
import { RecordTreeService } from '../../services/record-tree.service';
import { FileForRecord } from '../../../interfaces/Records/file-for-record';
import { FileContentService } from '../../services/file-content.service';
import { StreamType } from '../../../enums/stream-type';
import { ActiveStreamService } from '../../services/active-stream.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkspaceComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() hostRecordFile: ITree | undefined;
  @ViewChild(TabsComponent) tabsComponent: TabsComponent | undefined;
  streamType: StreamType = StreamType.Undefined;
  streamId : Guid = Guid.createEmpty();

  hostFileTitle = '';
  hostFilePath = '';
  code = '';

  constructor(
    private tabsService: TabsService,
    private convergenceService: ConvergenceService,
    private cdr: ChangeDetectorRef,
    private recordTreeService: RecordTreeService,
    private fileContentService: FileContentService,
    private activeStreamService: ActiveStreamService,
  ) {
  }

  ngOnChanges(): void {
    if (this.streamType === StreamType.Record) {
      if (this.hostRecordFile !== undefined) {
        const fileFOrRecordResponseSubscribe = this.recordTreeService
          .getFileForRecord(this.streamId, this.hostRecordFile.url)
          .subscribe(
            (value: FileForRecord) => {
              this.code = this.fileContentService.decodeContent(value.content, value.encoding);
              fileFOrRecordResponseSubscribe.unsubscribe();
            },
          );
        this.hostFileTitle = this.hostRecordFile.name;
        this.hostFilePath = this.hostRecordFile.relativePath;
        this.cdr.detectChanges();
      }
    }
  }

  ngOnInit() {
    this.activeStreamService.getStreamType()
      .subscribe((value) => this.streamType = <StreamType> value);
    this.activeStreamService.getStreamId().subscribe((value) => this.streamId = <Guid> value);
    if (this.streamType === StreamType.Stream) {
      this.convergenceService.getChildModel().subscribe((model) => {
        this.code = model.elementAt('Text').value();
      });

      this.convergenceService.getActiveHostStreamPath().pipe(first()).subscribe((path) => {
        this.hostFilePath = path;
        const splited = path.split('/');
        this.hostFileTitle = splited[splited.length - 1];
        this.cdr.detectChanges();
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.tabsComponent) {
      this.tabsService.setTabComponent(this.tabsComponent);
    }
  }
}
