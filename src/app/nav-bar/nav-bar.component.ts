import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { MaterialModule } from '../material.module';


@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
