import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  allTask = 0;
  doneTask = 0;
  urgentTask = 0;
  todayTask = 0;
  date = new Date();
  @ViewChild('myMode', { static: true }) myMode: ElementRef;

  @Input() mode = '';

  @Output() myEvent = new EventEmitter<{
    allTask: number;
    doneTask: number;
    urgentTask: number;
    todayTask: number;
  }>();

  data: any[] = [
    // {
    //   name: 'Teme',
    //   date: 'Feb 09 2023',
    //   realdate: new Date(),
    //   urgent: true,
    //   time: 0,
    //   intervalId: null,
    //   timerRunning: false,
    // },
  ];

  done: any[] = [];

  time = 0;
  intervalId: any;
  timerRunning = false;

  addObject(object: any) {
    this.data.push(object);
    this.allTask += 1;
    let objectDate = object.realdate;
    if (object.urgent === true) {
      this.urgentTask += 1;
    }
    if (
      objectDate.getFullYear() === this.date.getFullYear() &&
      objectDate.getMonth() === this.date.getMonth() &&
      objectDate.getDate() === this.date.getDate()
    ) {
      this.todayTask += 1;
    }

    this.myEvent.emit({
      allTask: this.allTask,
      doneTask: this.doneTask,
      urgentTask: this.urgentTask,
      todayTask: this.todayTask,
    });
  }

  addObjectDone(item: any) {
    this.done.push(item);
    let indexDelete = this.data.findIndex(
      (x) => x.name === item.name && x.realdate == item.realdate
    );
    this.data.splice(indexDelete, 1);
    this.doneTask += 1;
    this.myEvent.emit({
      allTask: this.allTask,
      doneTask: this.doneTask,
      urgentTask: this.urgentTask,
      todayTask: this.todayTask,
    });
  }

  deleteTask(item: any) {
    let indexDelete = this.data.findIndex(
      (x) => x.name === item.name && x.realdate == item.realdate
    );
    this.data.splice(indexDelete, 1);
    let objectDate = item.realdate;
    this.allTask -= 1;
    if (item.urgent === true) {
      this.urgentTask -= 1;
    }
    if (
      objectDate.getFullYear() === this.date.getFullYear() &&
      objectDate.getMonth() === this.date.getMonth() &&
      objectDate.getDate() === this.date.getDate()
    ) {
      this.todayTask -= 1;
    }
    this.myEvent.emit({
      allTask: this.allTask,
      doneTask: this.doneTask,
      urgentTask: this.urgentTask,
      todayTask: this.todayTask,
    });
  }

  @Input() searchValue = '';

  filteredItems() {
    if (this.searchValue == null) {
      if (this.mode == 'Today') {
        const date = new Date();
        return this.data.filter(
          (object) =>
            object.realdate.getDate() == date.getDate() &&
            object.realdate.getMonth() == date.getMonth() &&
            object.realdate.getFullYear() == date.getFullYear()
        );
      } else if (this.mode == 'Urgent') {
        return this.data.filter((object) => object.urgent === true);
      } else {
        return this.data;
      }
    } else {
      return this.data.filter((object) =>
        object.name.toLowerCase().includes(this.searchValue)
      );
    }
  }

  toggleTimer(item) {
    if (item.timerRunning) {
      clearInterval(item.intervalId);
      item.timerRunning = false;
    } else {
      item.intervalId = setInterval(() => {
        item.time++;
      }, 1000);
      item.timerRunning = true;
    }
  }

  gettimeDisplay(item) {
    const hours = Math.floor(item.time / 3600);
    const minutes = Math.floor((item.time % 3600) / 60);
    const seconds = item.time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
