import { environment } from '../../environments/environment';

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

  // TEMP: {
  //   URLS: {
  //     CONVERGENCE_URL: '',

  //     LIVECODE_ENDPOINTS: {
  //       GET_TREE_FOR_RECORD: 'http://localhost:3000/streams',
  //       GET_FILE_FOR_RECORD: 'http://localhost:3000/file-for-record',
  //     },

  //     BROADCASTING: {
  //       WEBCAM_DATA: 'ws://localhost:4000',
  //     },
  //   },
  // },

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
