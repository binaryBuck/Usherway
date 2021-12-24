import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Injectable, Optional, Component, NgZone } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
import auth from 'firebase/compat/app';
import { GoogleAuthProvider } from "firebase/auth";
import { FirebaseApp } from '@angular/fire/compat';
import {google} from 'googleapis';


declare var gapi: any;
const hoursFromNow = (n) => new Date(Date.now() + n * 1000 * 60 * 60 ).toISOString();
const calendar = google.calendar('v3');

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  
  user$: Observable<firebase.User>;
  calendarItems: any[];

  constructor(public angularFireAuth: AngularFireAuth) {
    this.initClient();
    this.user$ = angularFireAuth.authState;
  }

  // Initialize the Google API client with desired scopes, OG
  initClient() {
    console.log('1');
    gapi.load('client', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: 'AIzaSyCqiI_9U5YPanFH7DO3YCdGZiSzWn3PSyM',
        clientId: '949573618545-n8olkm2f7poe22s8s8818slptbfb1l7a.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      })

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));
    });
  }

  // // Trying sumn else, https://stackoverflow.com/questions/38091215/import-gapi-auth2-in-angular-2-typescript
  // initClient(): Promise<gapi.auth2.GoogleAuth> {
  //   var API_KEY = 'AIzaSyCqiI_9U5YPanFH7DO3YCdGZiSzWn3PSyM'
  //   var DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  //   var clientId = '949573618545-n8olkm2f7poe22s8s8818slptbfb1l7a.apps.googleusercontent.com'
  //   var scope = 'https://www.googleapis.com/auth/calendar'
  //   var initObj = {
  //       'apiKey': API_KEY,
  //       'clientId': clientId,
  //       'discoveryDocs': [DISCOVERY_DOC],
  //       'scope': scope
  //   };

  //   return new Promise((resolve, reject) => {
  //     console.log('hm');
  //     gapi.client.init(initObj).then(resolve, reject);
  //     console.log("somethings fishy here");
  //     gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));
  //   });
  // }

  getAuthState() {
    console.log('authstate initialized');
    return this.angularFireAuth.authState;
    //passing
  }

  async googleLoginWeb() {
    console.log('google login initialized');
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();
    const token = googleUser.getAuthResponse().id_token;

    console.log(googleUser)

    const credential = GoogleAuthProvider.credential(token);
    try{
      await this.angularFireAuth.signInAndRetrieveDataWithCredential(credential);
      console.log('calendar api data retrieved')
    } catch (error) {
      console.log("error", error);
      throw new Error(error);
    }
  }

  // Trying sumn else pt 2
  ngOnInit(): void {
    gapi.load('client').then(
        result => {
            gapi.apiLoaded = true;
            return gapi.initClient();
        },
        err => {
            gapi.apiFailed = true;
        }
    ).then(result => {
        gapi.apiReady = true;
    }, err => {
        gapi.apiFailed = true;
    });
  }
    
  async logout() {
    try {
      await this.angularFireAuth.signOut();
    } catch(error) {
      throw new Error(error);
    }
  }

  

  async getCalendar() {
    console.log('getting calendar');
    const events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    })

    console.log(events)

    this.calendarItems = events.result.items;
  }

  async insertEvent() {
    console.log('inserting event to calendar');
    const insert = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      start: {
        dateTime: hoursFromNow(2),
        timeZone: 'America/Los_Angeles'
      }, 
      end: {
        dateTime: hoursFromNow(3),
        timeZone: 'America/Los_Angeles'
      }, 
      summary: 'Have Fun!!!',
      description: 'Do some cool stuff and have a fun time doing it'
    })

    await this.getCalendar();
  }
    
}
