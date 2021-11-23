import { WidgetUtilService } from './../providers/widget-util.service';
import { FirebaseAuthService } from './../providers/firebase-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileInfo: any = {};
  profileAvailable: boolean = false;

  constructor(private firebaseAuthService: FirebaseAuthService, private widgetUtilService: WidgetUtilService) {
    this.getUserProfile();
  }

  ngOnInit() {

  }

  getUserProfile() {
    this.profileAvailable = false;
    this.firebaseAuthService.getAuthState().subscribe(user => {
      if(user) {
        this.profileInfo = user.toJSON();
      }
      console.log('%%%', this.profileInfo);
      this.profileAvailable = true;
    }, (error) => {
      this.profileAvailable = true;
      this.widgetUtilService.presentToast(error.message);
    });
  }

  async logout() {
    try {
      await this.firebaseAuthService.logout();
      this.widgetUtilService.presentToast('Logout Success');
    } catch (error) {
      console.log('Error', error);
      this.widgetUtilService.presentToast(error.message);
    }
  }

  async authorize() {
      console.log('calling authorized');
  }
}
