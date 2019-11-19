import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models';
import { Subscription } from 'rxjs';
import { AuthenticationService, VisitService, AlertService } from 'src/app/services';
import * as XLSX from 'xlsx';
import { visitAll } from '@angular/compiler';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-excel-import',
  templateUrl: './excel-import.component.html',
  styleUrls: ['./excel-import.component.scss']
})

export class ExcelImportComponent {
  currentUser: User;
  currentUserSubscription: Subscription;
  file: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authenticationService: AuthenticationService,
    private visitService: VisitService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ExcelImportComponent>) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.file = JSON.parse(JSON.stringify(jsonData));
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
  }

  ngOnInit() {
  }

  public save(){
    if(this.file){
      this.visitService.Update(this.file["Usalab Visitas"])
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Visitas atualizadas com sucesso!', true);
          this.dialogRef.close();
        },
        error => {
          this.alertService.error(error, true);
        });
    }
  }
}
