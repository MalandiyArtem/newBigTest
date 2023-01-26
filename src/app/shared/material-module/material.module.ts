import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';

const material = [
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatSliderModule,
  MatTooltipModule,
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
