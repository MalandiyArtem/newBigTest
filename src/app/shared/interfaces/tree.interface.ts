import { TreeObjectType } from './Records/tree-object-type';

export interface ITree {
  sha: string,
  name: string,
  showChildren: boolean,
  children: ITree[],
  relativePath: string,
  url: string,
  size: number,
  mode: string,
  type: TreeObjectType
}
