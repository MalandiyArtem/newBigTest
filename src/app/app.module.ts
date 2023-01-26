import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundModule } from './modules/pages/not-found/not-found.module';
import { HomeModule } from './modules/pages/home/home.module';
import { LiveStreamModule } from './modules/pages/live-stream/live-stream.module';
import { RecordModule } from './modules/pages/record/record.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LiveStreamModule,
    RecordModule,
    NotFoundModule,
    HomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
