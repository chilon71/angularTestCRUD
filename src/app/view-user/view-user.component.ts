import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsersDataService } from '../services/users-data.service';
import { UsersInformation } from '../main/main/main.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})


export class ViewUserComponent implements OnInit {

  userId: number;
  userForm: FormGroup
  userInfo: UsersInformation
  isAddedPage: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public usersHttp: UsersDataService) {
    this.userForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required
      ]),
      userDescription: new FormControl(''),
    });
  }

  ngOnInit(): void {
    const { snapshot } = this.route;
    if (snapshot.routeConfig?.path === 'add/user') {
      this.isAddedPage = true;
      return;
    }

    this.userId = +snapshot.paramMap.get('userId');
    this.usersHttp.getUsersById(this.userId).subscribe((data: any) => {
      this.userForm.patchValue({ userName: data.name, userDescription: data.description });
      this.userInfo = data;
    });
  }

  submitForm() {
    const { userDescription, userName } = this.userForm.value;
    const userInfo = {
      id: this.userId,
      name: userName,
      description: userDescription,
      editedAt: Date.now(),
      createdAt: this.userInfo.createdAt,
    }
    this.userInfo.editedAt = Date.now();
    this.usersHttp.updateUser(userInfo).subscribe(() => this.router.navigate(['/main']));
  }

  addUser() {
    if (!window.confirm('Are sure you want added this user?'))
      return;
    const { userDescription, userName } = this.userForm.value;
    const userInfo = {
      id: this.userId,
      name: userName,
      description: userDescription,
      editedAt: Date.now(),
      createdAt: Date.now(),
    }
    this.usersHttp.addUser(userInfo).subscribe(() => this.router.navigate(['/main']));
  }

  deleteUser() {
    if (!window.confirm('Are sure you want delete this user?'))
      return;
    this.usersHttp.deleteUser(this.userId).subscribe(() => this.router.navigate(['/main']));
  }
}
