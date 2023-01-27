import * as monaco from 'monaco-editor';
import { environment } from '../../environments/environment';
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 4
1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950
qwertyuiopasdfghjklzxcvbnmqwertyuioasdfghjklzxcvbnmqwertyuiopoasdfghjklzxcvbnm
1234567890123456789012345678901234567890123456789
export const CONSTANTS = {
  URLS: {
    CONVERGENCE_URL: 'https://liveshare.advantiss.ml/realtime/convergence/default',

    GITHUB: {
      GET_FILE_TEXT: 'https://api.github.com/repos/{ownerName}/{repoName}/contents/{pathToFile}?ref={hash}',
    },

    LIVECODE_ENDPOINTS: {
      GET_TREE_FOR_RECORD: `${environment.apiUrl}/api/app/stream/file-tree-for-record`,
      GET_FILE_FOR_RECORD: `${environment.apiUrl}/api/app/stream/file-for-livePage`,
      GET_RECORD_INFO: `${environment.apiUrl}/api/app/stream/record-info-test`,
    },

    BROADCASTING: {
      STUN_SERVER: 'stun:stun.l.google.com:19302',
    },
  },

  TEMP: {
    URLS: {
      CONVERGENCE_URL: '',

      LIVECODE_ENDPOINTS: {
        GET_TREE_FOR_RECORD: 'http://localhost:3000/streams',
        GET_FILE_FOR_RECORD: 'http://localhost:3000/file-for-record',
      },

      BROADCASTING: {
        WEBCAM_DATA: 'ws://localhost:4000',
      },
    },
  },
};

export const FAKE_HOST_FILE_PATH = 'lc-extension/.gitignore';

export const FAKE_TREE_DATA = {
  PROJECT_TREE: 'd:\\AdvantiSS\\lc-extension\\.gitignore,d:\\AdvantiSS\\lc-extension\\.vscodeignore,d:\\AdvantiSS\\lc-extension\\package-lock.json,d:\\AdvantiSS\\lc-extension\\package.json,d:\\AdvantiSS\\lc-extension\\src\\AddFriendDataProvider.ts,d:\\AdvantiSS\\lc-extension\\src\\DeleteFriendTreeProvider.ts,d:\\AdvantiSS\\lc-extension\\src\\ShareSessionTreeProvider.ts,d:\\AdvantiSS\\lc-extension\\src\\Storage.ts,d:\\AdvantiSS\\lc-extension\\src\\constants.ts,d:\\AdvantiSS\\lc-extension\\src\\extension.ts,d:\\AdvantiSS\\lc-extension\\tsconfig.json,d:\\AdvantiSS\\lc-extension\\tslint.json',
  PROJECT_FOLDER: 'lc-extension',
};

export const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  theme: 'vs-dark',
  language: 'javascript',
  readOnly: true,
  automaticLayout: true,
  padding: {
    top: 5,
  },
};
