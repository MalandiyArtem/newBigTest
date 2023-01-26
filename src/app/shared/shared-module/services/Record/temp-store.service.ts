import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { RecordConfigService } from './record-config.service';

interface Item {
  [key: string]: string
}

interface TempStore {
  items: Item[]
}

export interface GetContentFromTempResponse {
  hasTempContent: boolean;
  text?: string;
  path: string;
}

@Injectable({
  providedIn: 'root',
})
export class TempStoreService {
  constructor(private recordConfigService: RecordConfigService) {
  }

  private index: TempStore = {
    items: [],
  };

  private wholeText: TempStore = {
    items: [],
  };

  setIdToFile(path: string) {
    if (this.index.items.find((item) => path in item) === undefined) {
      this.index.items.push({ [path]: `${this.generateId()}` });
    }
  }

  getFileId(relativePath: string | undefined) {
    if (relativePath) {
      try {
        const pairPathId = this.index.items.filter((pathId) => Object.keys(pathId).includes(relativePath))[0];
        return pairPathId[relativePath] ? pairPathId[relativePath] : undefined;
      } catch (e) {
        return undefined;
      }
    }
    return undefined;
  }

  async setTempWholeText(path: string, text: string, isFromGithub?: boolean) {
    let relativePath = path;

    if (isFromGithub) {
      relativePath = `${this.recordConfigService.config?.rootFolder}\\${path}`;
    }
    const fileId = this.getFileId(relativePath);

    if (fileId) {
      const idInWholeText = this.wholeText.items.find((wholeTextItem) => fileId in wholeTextItem);
      if (idInWholeText === undefined) {
        this.wholeText.items.push({ [fileId]: text });
      } else {
        const indexToReplace = this.wholeText.items.indexOf(idInWholeText);
        if (indexToReplace !== -1) {
          this.wholeText.items[indexToReplace] = { [fileId]: text };
        }
      }
    } else {
      this.setIdToFile(relativePath);
    }
  }

  getContentFromTemp(relativePath: string) {
    const fileId = this.getFileId(relativePath);
    if (fileId) {
      const idInWholeText = this.wholeText.items.find((wholeTextItem) => fileId in wholeTextItem) || {};
      return { hasTempContent: true, path: relativePath, text: idInWholeText[fileId] };
    }
    return { hasTempContent: false, path: relativePath };
  }

  clearTemp() {
    this.index.items = [];
    this.wholeText.items = [];
  }

  private generateId() {
    return Guid.create();
  }
}
