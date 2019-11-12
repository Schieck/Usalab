import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User, Essay } from '../models';
import { Subscription } from 'rxjs';
import { AuthenticationService, EssayService, AlertService } from '../services';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EssayComponent } from '../components/essay/essay.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  essays: Essay[] = [];

  loading = false;
  submitted = false;

  essayForm: FormGroup;
  type: string = "education";

  constructor(
    private authenticationService: AuthenticationService,
    private essayService: EssayService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private alertService: AlertService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.essayForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      from: [new Date],
      to: [new Date]
    });
    this.loadAllEssays();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  editEssay(id){
    this.essayService.getById(id).pipe(first()).subscribe(essay => {
      this.essayForm.value.title = essay["title"];
      this.essayForm.value.id = essay["id"];
      this.essayForm.value.description = essay["description"];
      this.essayForm.value.from = essay["from"];
      this.essayForm.value.to = essay["to"];
    });
  }



  deleteEssay() {
    this.essayService.delete(this.essayForm.value.id).pipe(first()).subscribe(() => {
      this.loadAllEssays()
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.essayForm.invalid) {
      return;
    }

    this.essayForm.value.type = this.type;
    this.essayForm.value.user = this.currentUser.id;

    this.loading = true;

    this.essayService.register(this.essayForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Simulação cadastrada com sucesso!', true);
          this.loadAllEssays();
        },
        error => {
          this.alertService.error(error, true);
          this.loading = false;
          this.loadAllEssays();
        });
  }

  private loadAllEssays() {
    this.essayService.getAll(this.type).pipe(first()).subscribe(essays => {
      this.essays = essays;
      this.essayForm.value.title = essays[0].title;
      this.essayForm.value.id = essays[0].id;
      this.essayForm.value.description = essays[0].description;
      this.essayForm.value.from = essays[0].from;
      this.essayForm.value.to = essays[0].to;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EssayComponent, {
        width: '300px',
        data: this.type
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.currentUserSubscription.unsubscribe();
      this.loadAllEssays();
    });
  }

  formatDate(dateString: string): string{
    let date = new Date(dateString);

    return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
  }

}
