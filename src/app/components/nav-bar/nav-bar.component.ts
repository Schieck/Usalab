import { Component, OnInit, Input } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { MaterialModule } from '../../material.module';
import { AuthenticationService } from 'src/app/services';
import { Router } from '@angular/router';


@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  @Input() avatar : string;

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
