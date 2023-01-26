import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared-module/shared-module.module';
import { LiveStreamComponent } from './components/live-stream/live-stream.component';

@NgModule({
  declarations: [
    LiveStreamComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  bootstrap: [LiveStreamComponent],
})
export class LiveStreamModule { }
