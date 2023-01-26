import { FileEncodingType } from './file-encoding-type';

export interface FileForRecord {
  content: string,
  sha: string,
  size: number,
  encoding: FileEncodingType
}
