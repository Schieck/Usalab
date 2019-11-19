import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models';
import { Subscription } from 'rxjs';
import { AuthenticationService, AlertService, EssayService } from 'src/app/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-essay',
  templateUrl: './essay.component.html',
  styleUrls: ['./essay.component.scss']
})

export class EssayComponent {
  currentUser: User;
  currentUserSubscription: Subscription;

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  type = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<EssayComponent>,
    private formBuilder: FormBuilder,
    private essayService: EssayService,
    private alertService: AlertService)
    {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.type = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      fromDate: [new Date],
      toDate: [new Date],
      fromTime: [new Date().getHours() + ':' + new Date().getMinutes(), Validators.required],
      toTime: [new Date().getHours() + ':' + new Date().getMinutes(), Validators.required]
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

    this.registerForm.value.type = this.data;
    this.registerForm.value.user = this.currentUser.id;

    this.loading = true;

    this.essayService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Simulação cadastrada com sucesso!', true);
          this.dialogRef.close();
        },
        error => {
          this.alertService.error(error, true);
          this.loading = false;
        });
  }
}
