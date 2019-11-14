import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User, Essay } from '../models';
import { Subscription } from 'rxjs';
import { AuthenticationService, EssayService, AlertService } from '../services';
import { MatDialog } from '@angular/material/dialog';
import { EssayComponent } from '../components/essay/essay.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})
export class ResearchComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  essays: Essay[] = [];

  loading = false;
  submitted = false;

  essayForm: FormGroup;
  type: string = "research";

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
      fromDate: [new Date],
      toDate: [new Date],
      fromTime: [''],
      toTime: [''],
      type: [this.type],
      user: [''],
      id: ['']
    });
    this.loadAllEssays();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  editEssay(id) {
    this.essayService.getById(id).pipe(first()).subscribe(essay => {
      this.essayForm.setValue(essay);
    });
  }
  get f() { return this.essayForm.controls; }

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

    this.essayService.update(this.essayForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Simulação Atualizada com sucesso!', true);
          this.loading = false;
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
      if (essays[0])
        this.editEssay(essays[0].id)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EssayComponent, {
      width: '350px',
      data: this.type
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.currentUserSubscription.unsubscribe();
      this.loadAllEssays();
    });
  }

  formatDate(dateString: string): string {
    return (new Date(dateString)).toLocaleDateString();
  }

}
