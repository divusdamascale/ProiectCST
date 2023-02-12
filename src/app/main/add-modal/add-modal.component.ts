import { Component, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { dateValidator } from '../validators/date-validator';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
})
export class AddModalComponent {
  isVisible = false;
  today = new Date().toISOString().substring(0, 10);
  date = new Date();

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl('', [Validators.required, dateValidator]),
    urgent: new FormControl(false),
  });

  constructor(private cd: ChangeDetectorRef) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.form.valid) {
      this.createObject();
      this.save();
      this.resetForm();
      this.isVisible = false;
    } else {
      console.log('error');
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetForm();
  }

  resetForm() {
    this.form.reset();
  }

  @Output() saved = new EventEmitter<any>();

  createObject() {
    const object = {
      name: this.form.get('name').value,
      date: this.form.get('date').value,
      urgent: this.form.get('urgent').value,
      timer: 0,
    };

    console.log(object);
  }

  save() {
    const date = this.form.get('date').value;
    const firstPart = date.toString().substring(4, 15);
    console.log(firstPart);
    this.saved.emit({
      name: this.form.get('name').value,
      date: firstPart,
      realdate: date,
      urgent: this.form.get('urgent').value,
      time: 0,
      intervalId: null,
      timerRunning: false,
    });
  }
}
