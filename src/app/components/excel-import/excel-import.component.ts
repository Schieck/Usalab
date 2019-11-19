import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services';
import * as XLSX from 'xlsx';

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
    reader.readAsBinaryString(file);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
  }

  ngOnInit() {
  }
}
