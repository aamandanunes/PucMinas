import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  url: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.router.url != '/signin')
    this.url = true;
  }
  title = 'tcc-sistema-saude';
}
