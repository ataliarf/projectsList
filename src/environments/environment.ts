// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCHnb6QbQ832_9cMscLN2pr5-Ao3NWDkNY",
    authDomain: "newproject-300db.firebaseapp.com",
    projectId: "newproject-300db",
    storageBucket: "newproject-300db.appspot.com",
    messagingSenderId: "214543782032",
    appId: "1:214543782032:web:2084c8d5eccee05b33c815"
  }
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// {
//   "rules": {
//     ".read": "now < 1661634000000",  // 2022-8-28
//     ".write": "now < 1661634000000",  // 2022-8-28
//   }
// }