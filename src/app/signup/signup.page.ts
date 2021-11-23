import { WidgetUtilService } from './../providers/widget-util.service';
import { FirebaseAuthService } from './../providers/firebase-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SIGNUP } from '../constants/formValidationMessage';
import { HelperService } from './../providers/helper.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  email: FormControl;
  password: FormControl;
  formError: any = {
    email: '',
    password: ''
  };
  validationMessage : any = SIGNUP;
  showSignupSpinner: boolean = false;

  constructor(private helperService: HelperService, private router: Router, private FirebaseAuthService: FirebaseAuthService, private widgetUtilService: WidgetUtilService) { }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
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
    this.signupForm = new FormGroup({
      email: this.email,
      password: this.password
    });
    this.signupForm.valueChanges.subscribe(data => this.onFormValueChanged(data));
  }

  onFormValueChanged(data) {
    this.formError = this.helperService.prepareValidationMessage(this.signupForm, this.validationMessage, this.formError);
  }

}
