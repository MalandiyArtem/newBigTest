import * as monaco from 'monaco-editor';
import { Injectable } from '@angular/core';
import { editor } from 'monaco-editor';
import { RemoteCursor } from '@convergencelabs/monaco-collab-ext/typings/RemoteCursor';
import { RemoteCursorManager } from '@convergencelabs/monaco-collab-ext';
import { ChangeCommand } from '../../../interfaces/Records/recorded-code-commands.interface';

@Injectable({
  providedIn: 'root',
})
export class MonacoService {
  private editorInstance?: editor.IStandaloneCodeEditor;
  private container?: HTMLElement;
  private remoteCursorManager?: RemoteCursorManager;
  private cursor?: RemoteCursor;

  setEditorInstance(instance: editor.IStandaloneCodeEditor, container: HTMLElement) {
    this.editorInstance = instance;
    this.container = container;
    this.remoteCursorManager = new RemoteCursorManager({
      editor: instance,
      tooltips: false,
      showTooltipOnHover: false,
      tooltipDuration: 5,
      className: 'remoteCursor',
      tooltipClassName: 'remoteCursorTooltip',
    });
    this.cursor = this.remoteCursorManager.addCursor('id', 'color');
  }

  destroyMonaco() {
    this.container?.remove();
    this.editorInstance?.getModel()?.dispose();
    this.editorInstance?.dispose();
  }

  setWholeTextInMonaco(text: string) {
    this.editorInstance?.getModel()?.setValue(text);
  }

  getWholeTextFromMonaco() {
    return this.editorInstance?.getModel()?.getValue();
  }

  setPlaybackValueInMonaco(command: ChangeCommand, isRemove = false) {
    const cursorPosition = {
      column: command.position.charEnd,
      lineNumber: command.position.lineEnd,
    };
    const monacoRange = new monaco.Range(
      command.position.lineStart,
      command.position.charStart,
      command.position.lineEnd,
      command.position.charEnd,
    );
    this.setValueInMonaco(cursorPosition, monacoRange, isRemove ? '' : command.text);
  }

  private async setValueInMonaco(cursorPosition: monaco.IPosition, monacoRange: monaco.Range, textTest: string) {
    const editorModel = this.editorInstance?.getModel();
    this.cursor?.setPosition(cursorPosition);
    this.editorInstance?.revealPositionInCenter(
      {
        column: monacoRange.endColumn,
        lineNumber:
        monacoRange.endLineNumber,
      },
    );
    if (this.editorInstance && editorModel) {
      editorModel.pushEditOperations(
        [],
        [{ range: monacoRange, text: textTest, forceMoveMarkers: true }],
        () => null,
      );
    }
  }
}
