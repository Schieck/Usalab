import { Component, OnInit, Input } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { MaterialModule } from '../../material.module';
import { AuthenticationService } from 'src/app/services';
import { Router } from '@angular/router';
import { User } from 'src/app/models';


@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  @Input() currentUser : User;

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
