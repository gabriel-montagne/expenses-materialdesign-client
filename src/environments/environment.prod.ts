export const environment = {
  apiUrl: 'http://localhost:9000/',
  apiToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJ1c2VybmFtZSI6ImdhYnJpZWwubXVudGVhbnVAY2FybWF0Y2guY29tIiwiZW1haWwiOiJnYWJyaWVsLm11bnRlYW51QGNhcm1hdGNoLmNvbSIsInJvbGUiOiJ1c2VyIn0.' +
  'vuF5k2hy9ON0zkT8ixJU5zWhuzfA-f1EYap2cqNr7t8',
  production: true,
  reduxLog: false
};

const PROVIDERS: any[] = [
  {provide: 'Window', useFactory: getWindow}
];

export function getWindow() {
  return window;
}

export const ENV_PROVIDERS = [
  ...PROVIDERS,
];
