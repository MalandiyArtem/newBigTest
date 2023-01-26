export interface ChangePosition {
  lineStart: number;
  charStart: number;
  lineEnd: number;
  charEnd: number;
}

export interface EndCommand {
  event: string;
  changeTime: number;
}

export interface ChangeFileCommand extends EndCommand {
  path: string;
}

export interface ChangeCommand extends ChangeFileCommand {
  text: string;
  position: ChangePosition;
}

export interface RecordedCodeCommands {
  commands: (EndCommand | ChangeCommand | ChangeFileCommand)[];
}
