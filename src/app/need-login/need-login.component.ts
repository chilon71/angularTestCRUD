import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-need-login',
  templateUrl: './need-login.component.html',
  styleUrls: ['./need-login.component.scss']
})
export class NeedLoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loginUser = () => {
    window.localStorage.setItem('isLogin', 'true');
    this.router.navigate(['/main']);
  }
}
