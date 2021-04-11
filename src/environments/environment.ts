// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /* urlA: "https://apitst.premiercredit.co:11445/PremierServices_api_ext_tst/api/login/authenticate",
  urlV: "https://apitst.premiercredit.co:11445/premierservices_api_ext_tst/api/viabilizacion/getViabilizacion" */
  urlA: "https://api.premiercredit.co:11444/PremierServices_API_EXT/api/login/authenticateEncoded",
  urlV: "https://api.premiercredit.co:11444/premierservices_api_ext/api/viabilizacion/getViabilizacionModular"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
