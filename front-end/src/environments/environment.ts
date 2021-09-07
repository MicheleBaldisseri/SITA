// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  mdmUrl: 'http://0.0.0.0:19001',
  kpiUrl: 'http://0.0.0.0:19002',
  userUrl: 'http://0.0.0.0:19000'
};
