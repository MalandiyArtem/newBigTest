import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RecordComponent } from './components/record/record.component';
import { SharedModule } from '../../../shared/shared-module/shared-module.module';
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
123456789cut here please987654321
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
