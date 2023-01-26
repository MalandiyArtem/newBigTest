import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/chat.component';
import { ChatMessageComponent } from './components/chat/chat-message/chat-message.component';
import { PanelComponent } from './components/panel/panel.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TabComponent } from './components/tab/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TreeComponent } from './components/tree/tree.component';
import { ViewersComponent } from './components/viewers/viewers.component';
import { ViewerComponent } from './components/viewers/viewer/viewer.component';
import { TotalViewersComponent } from './components/viewers/total-viewers/total-viewers.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { TabsService } from './services/tabs.service';
import { FullscreenComponent } from './components/fullscreen/fullscreen.component';
import { ControllerComponent } from './components/controller/controller.component';
import { DynamicTabsDirective } from './directives/dynamic-tabs.directive';
import { IsIframeDirective } from './directives/is-iframe.directive';
import { ControlDirective } from './directives/control.directive';
import { IsFullscreenDirective } from './directives/is-fullscreen.directive';
import { TreeService } from './services/tree.service';
import { RecordTreeService } from './services/record-tree.service';
import { WebcamComponent } from './components/webcam/webcam.component';
import { MaterialModule } from '../material-module/material.module';

@NgModule({
  declarations: [
    ChatComponent,
    ChatMessageComponent,
    PanelComponent,
    SidebarComponent,
    TabComponent,
    TabsComponent,
    TreeComponent,
    ViewersComponent,
    ViewerComponent,
    TotalViewersComponent,
    WorkspaceComponent,
    ControllerComponent,
    FullscreenComponent,
    DynamicTabsDirective,
    IsIframeDirective,
    ControlDirective,
    IsFullscreenDirective,
    WebcamComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [
    TabsService,
    TreeService,
    RecordTreeService,
  ],
  exports: [
    ChatComponent,
    ChatMessageComponent,
    PanelComponent,
    SidebarComponent,
    TabComponent,
    TabsComponent,
    TreeComponent,
    ViewersComponent,
    ViewerComponent,
    TotalViewersComponent,
    WorkspaceComponent,
    ControllerComponent,
    FullscreenComponent,
    IsIframeDirective,
    ControlDirective,
    IsFullscreenDirective,
    WebcamComponent,
    MaterialModule,
  ],
})
export class SharedModule {
}
