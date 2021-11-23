import { WidgetUtilService } from './../providers/widget-util.service';
import { FirebaseAuthService } from './../providers/firebase-auth.service';
import { HelperService } from './../providers/helper.service';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LOGIN } from './../constants/formValidationMessage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  formError: any = {
    email: '',
    password: ''
  };
  validationMessage : any = LOGIN;

  constructor(private helperService: HelperService, private router: Router, private firebaseAuthService: FirebaseAuthService, private widgetUtilService: WidgetUtilService) {

  }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  async googleLoginWeb() {
    try {
      await this.firebaseAuthService.googleLoginWeb();
    } catch (error) {
      console.log(error);
      this.widgetUtilService.presentToast(error.message);
    }
  }

  goToSignupPage() {
    this.router.navigate(['/signup']);
  }

  createFormControl(){
    this.email = new FormControl('', [
      Validators.required, 
      Validators.email
    ]);
    this.password = new FormControl('', [
      Validators.required, 
      Validators.minLength(6)
    ]);
  }

  createForm(){
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
    this.loginForm.valueChanges.subscribe(data => this.onFormValueChanged(data));
  }

  onFormValueChanged(data) {
    this.formError = this.helperService.prepareValidationMessage(this.loginForm, this.validationMessage, this.formError);
  }
}
