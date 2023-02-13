import { PassDataService } from './../../_core/services/pass-data.service';
import { LoggedInService } from './../../_core/services/logged-in.service';
import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
})
export class ToDoComponent {
  searchText: string;
  token = null;
  status: string;

  allTask = 0;
  doneTask = 0;
  urgentTask = 0;
  todayTask = 0;

  tokenTest = {
    email: 'asd@asd',
    lastName: 'test',
    firstName: 'test1',
    password: 'test',
  };

  constructor(
    private PassDataService: PassDataService,
    private router: Router,
    private Loggedin: LoggedInService
  ) {
    this.token = PassDataService.getFormGroup();
    if (this.token == null) {
      this.token = this.tokenTest;
    }
  }

  test(): void {
    console.log(this.Loggedin.LoggedIn);
  }

  setToday(): void {
    this.status = 'Today';
  }

  setUrgent(): void {
    this.status = 'Urgent';
  }

  setAll(): void {
    this.status = 'All';
  }

  handleEvent(event) {
    this.allTask = event.allTask;
    this.doneTask = event.doneTask;
    this.urgentTask = event.urgentTask;
    this.todayTask = event.todayTask;
  }

  logout() {
    this.Loggedin.LoggedIn = true;
    this.router.navigate(['/auth']);
  }
}
