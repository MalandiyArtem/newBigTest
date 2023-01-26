import { ITree } from '../tree.interface';

export interface FileTreeForRecord {
  sha: string,
  url: string,
  treeEntries: ITree[]
}
