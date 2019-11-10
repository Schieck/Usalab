import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FileValidator } from 'ngx-material-file-input';

import { AlertService, UserService, AuthenticationService } from '../services';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  image = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      avatar: [null]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.image);

    if (this.image != null) {
      this.registerForm.value.avatar = this.image;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  loadImage() {
    if (this.registerForm.value.avatar)
      if (this.registerForm.value.avatar._files && this.registerForm.value.avatar._files[0]) {
        try {
          var reader = new FileReader();

          reader.onload = (e: any) => {
            this.image = e.target.result;
          };

          reader.readAsDataURL(this.registerForm.value.avatar._files[0]);

        } catch{
          this.alertService.error("Insira uma imagem válida.");
          this.image = null;
          return;
        }
      }else{
        this.image = null;
      }
  }
}