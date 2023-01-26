export class TreeService {
  getTree(hostFiles: string, projectFile: string) {
    return projectFile || hostFiles;
  }
}
