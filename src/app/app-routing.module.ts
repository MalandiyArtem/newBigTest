import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveStreamComponent } from './modules/pages/live-stream/components/live-stream/live-stream.component';
import { RecordComponent } from './modules/pages/record/components/record/record.component';
import { HomeComponent } from './modules/pages/home/components/home/home.component';
import { NotFoundComponent } from './modules/pages/not-found/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home/:streamType/:streamId', component: HomeComponent },
  { path: 'stream', component: LiveStreamComponent },
  { path: 'record', component: RecordComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
