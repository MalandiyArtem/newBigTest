import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RecordComponent } from './components/record/record.component';
import { SharedModule } from '../../../shared/shared-module/shared-module.module';

@NgModule({
  declarations: [
    RecordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatTooltipModule,
  ],
  bootstrap: [RecordComponent],
})
export class RecordModule { }
