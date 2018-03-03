// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  apiUrl: 'http://localhost:9000/',
  apiToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJ1c2VybmFtZSI6ImdhYnJpZWwubXVudGVhbnVAY2FybWF0Y2guY29tIiwiZW1haWwiOiJnYWJyaWVsLm11bnRlYW51QGNhcm1hdGNoLmNvbSIsInJvbGUiOiJ1c2VyIn0.' +
  'vuF5k2hy9ON0zkT8ixJU5zWhuzfA-f1EYap2cqNr7t8',
  production: false,
  reduxLog: true
};

export const oAuthProviders = {
  'google': {
    'clientId': '252899479655-qahi3ahjuvojjbjgp8v6qr9bpsam57fb.apps.googleusercontent.com '
  }
  /*
		,
		'linkedin': {
			'clientId': 'LINKEDIN_CLIENT_ID'
		},
		'facebook': {
			'clientId': 'FACEBOOK_CLIENT_ID',
			'apiVersion': 'v2.4' // like v2.4
		}
	*/
};

const PROVIDERS: any[] = [
  {provide: 'Window', useFactory: getWindow}
];

export function getWindow() {
  return window;
}

export const ENV_PROVIDERS = [
  ...PROVIDERS
];
