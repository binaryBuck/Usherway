import { WidgetUtilService } from './providers/widget-util.service';
import { Router } from '@angular/router';
import { FirebaseAuthService } from './providers/firebase-auth.service';
import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { 
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    }
  ];

  isLoggedIn: boolean = false;

  constructor(private platform: Platform, private firebaseAuthService: FirebaseAuthService, public auth: FirebaseAuthService, private router: Router, private widgetUtilService: WidgetUtilService) {
    this.initializeApp();
  }

  initializeApp() {
    this.getAuthState();
  }

  getAuthState(){
    this.widgetUtilService.presentLoading();
    this.firebaseAuthService.getAuthState().subscribe(user => {
      console.log('user auth state===', user ? user.toJSON(): null);
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      this.handleNavigation();
      this.widgetUtilService.dismissLoader();
    }, (error) => {
      this.widgetUtilService.dismissLoader();
      this.widgetUtilService.presentToast(error.message);
    });
  }

  handleNavigation() {
    if (this.isLoggedIn) {
      console.log('route===', this.router.url.split('/')[1]);
      const currentUrl = this.router.url.split('/')[1];
      if (currentUrl === 'login' || currentUrl === 'signup') {
        this.router.navigate(['/home']);
      }
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}
