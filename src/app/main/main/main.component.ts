import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersDataService } from '../../services/users-data.service'

export interface UsersInformation {
  id: number;
  name: string;
  description: string;
  createdAt: number;
  editedAt: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'description', 'createdAt', 'editedAt', 'CRUDBtn'];
  updateTableValue;

  constructor(
    public usersHttp: UsersDataService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.usersHttp.getUsers();
    this.updateTableValue = setInterval(() => {
      this.usersHttp.getUsers();
    }, 3000)
  }

  ngOnDestroy(): void {
    clearInterval(this.updateTableValue);
  }

  tableRowClick = (el, row) => {
    if (el.target.className.includes('button'))
      return;
    const { id } = row;
    this.openEditWindow(id);
  }

  openEditWindow = (id) => {
    this.router.navigate([`/user/${id}`]);
  }

  buttonEditOn = (row) => {
    const { id } = row;
    this.openEditWindow(id);
  }

  deleteUser = (id) => {
    if (!window.confirm('Are sure you want delete this user?'))
      return;
    this.usersHttp.deleteUser(id).subscribe(() => this.usersHttp.getUsers());
  }

  logoutUser = () => {
    window.localStorage.removeItem('isLogin');
    this.router.navigate(['/']);
  }
}
