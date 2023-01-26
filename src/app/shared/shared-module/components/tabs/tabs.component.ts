import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { DynamicTabsDirective } from '../../directives/dynamic-tabs.directive';
import { ActiveFileService } from '../../services/active-file.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) staticTabs: QueryList<TabComponent> | undefined;
  @ViewChild(DynamicTabsDirective) dynamicTabPlaceholder: DynamicTabsDirective | undefined;
  @Input() activeTabByDefault = 0;

  dynamicTabs: TabComponent[] = [];

  constructor(private activeFileService: ActiveFileService) {
  }

  ngAfterContentInit(): void {
    if (this.staticTabs) {
      const activeTabs = this.staticTabs.filter((tab: TabComponent) => tab.active);
      const getActiveTabByDefault = this.staticTabs.get(this.activeTabByDefault);

      if (activeTabs.length === 0 && getActiveTabByDefault) {
        this.selectTab(getActiveTabByDefault);
      }
    }
  }

  selectTab(tabComponent: TabComponent) {
    if (tabComponent.disabled) {
      return;
    }
    if (this.staticTabs) {
      this.staticTabs.toArray().forEach((tab: TabComponent) => tab.active = false);
      this.dynamicTabs.forEach((tab: TabComponent) => tab.active = false);
      tabComponent.active = true;
      if (tabComponent.filePath) {
        this.activeFileService.setActiveFile(tabComponent.filePath);
      }
    }
  }

  openTab(
    title: string,
    path: string,
    template: TemplateRef<ElementRef>,
    context: any,
    isCloseable = false,
  ) {
    const openedStaticFile = this.staticTabs?.toArray().filter((tab) => path === tab.filePath);
    const openedDynamicFiles = this.dynamicTabs.filter((tab) => path === tab.filePath);

    if (openedDynamicFiles.length !== 0) {
      this.selectTab(openedDynamicFiles[0]);
      return;
    }
    if (openedStaticFile && openedStaticFile.length !== 0) {
      this.selectTab(openedStaticFile[0]);
      return;
    }

    const viewContainerRef = this.dynamicTabPlaceholder?.viewContainer;
    const componentRef = viewContainerRef?.createComponent(TabComponent);
    const instance: TabComponent = componentRef?.instance as TabComponent;

    instance.title = title;
    instance.template = template;
    instance.dataContext = context;
    instance.isCloseable = isCloseable;
    instance.filePath = path;

    this.dynamicTabs.push(instance);
    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
  }

  closeTab(tab: TabComponent) {
    this.dynamicTabs.forEach((dynamicTab: TabComponent, index: number) => {
      if (dynamicTab === tab && this.staticTabs) {
        this.dynamicTabs.splice(index, 1);
        const viewContainerRef = this.dynamicTabPlaceholder?.viewContainer;
        viewContainerRef?.remove(index);
        this.selectTab(this.staticTabs.first);
      }
    });
  }
}
