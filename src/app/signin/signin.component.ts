import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  formdata: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      emailid: new FormControl("adm@adm"),
      passwd: new FormControl("adm")
    });
  }

  onClickSubmit() {
    let login = this.formdata.value;
    if(login.emailid == 'adm@adm' && login.passwd == 'adm'){
      this.router.navigate(['dashboard']);
    }
  }

}
