import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User, Essay } from 'src/app/models';
import { Subscription } from 'rxjs';
import { AuthenticationService, AlertService, EssayService } from 'src/app/services';

@Component({
  selector: 'app-essay-dialog',
  templateUrl: './essay-dialog.component.html',
  styleUrls: ['./essay-dialog.component.scss']
})

export class EssayDialogComponent {
  currentUser: User;
  currentUserSubscription: Subscription;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<EssayDialogComponent>)
    {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
  }

  ngOnInit() {
  }
}
