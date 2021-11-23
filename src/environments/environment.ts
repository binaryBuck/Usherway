// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //Attaching firebase
  firebaseConfig: {
    apiKey: "AIzaSyCqiI_9U5YPanFH7DO3YCdGZiSzWn3PSyM",
    authDomain: "myapp-1c235.firebaseapp.com",
    projectId: "myapp-1c235",
    storageBucket: "myapp-1c235.appspot.com",
    messagingSenderId: "949573618545",
    appId: "1:949573618545:web:e1abdfee84303fdda9c4d0"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
