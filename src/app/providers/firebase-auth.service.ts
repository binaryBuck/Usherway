import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
import auth from 'firebase/compat/app';
import { GoogleAuthProvider } from "firebase/auth";

declare var gapi: any;
const hoursFromNow = (n) => new Date(Date.now() + n * 1000 * 60 * 60 ).toISOString();

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  user$: Observable<firebase.User>;
  calendarItems: any[];

  constructor(private angularFireAuth: AngularFireAuth) {
    this.initClient();
    this.user$ = angularFireAuth.authState;
  }

  initClient() {
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
    
  async logout(){
    try {
      await this.angularFireAuth.signOut();
    } catch(error) {
      throw new Error(error);
    }
  }

  getAuthState() {
    return this.angularFireAuth.authState;
  }

  async googleLoginWeb() {
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

  async getCalendar() {
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