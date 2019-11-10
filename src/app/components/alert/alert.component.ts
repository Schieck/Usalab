import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AlertService } from '../../services';

@Component({
  selector: 'alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService, private toastr: ToastrService) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
      if(this.message){
        if(this.message.type === 'success')
          this.showSuccess(this.message.text);

        if (this.message.type === 'error')
          this.showError(this.message.text);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showSuccess(text) {
    this.toastr.success(text, 'Sucesso!');
  }

  showError(text) {
    this.toastr.error(text, 'Erro!');
  }
}