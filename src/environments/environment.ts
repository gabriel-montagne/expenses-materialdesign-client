// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { appConfigTest } from './../app/app.config.test';

export const environment = {
    apiUrl: 'http://localhost:9000/',
    apiToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJ1c2VybmFtZSI6ImdhYnJpZWwubXVudGVhbnVAY2FybWF0Y2guY29tIiwiZW1haWwiOiJnYWJyaWVsLm11bnRlYW51QGNhcm1hdGNoLmNvbSIsInJvbGUiOiJ1c2VyIn0.' +
    'vuF5k2hy9ON0zkT8ixJU5zWhuzfA-f1EYap2cqNr7t8',
    production: false
};


const PROVIDERS: any[] = [
    { provide: 'AppConfig', useFactory: getConfig },
    { provide: 'Window', useFactory: getWindow }
];

export function getConfig() {
    return appConfigTest;
}

export function getWindow() {
    return window;
}

export const ENV_PROVIDERS = [
    ...PROVIDERS,
];
