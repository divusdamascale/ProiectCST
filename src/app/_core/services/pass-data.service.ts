import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  private myFormGroup: FormGroup;

  constructor() { }

  setFormGroup(formGroup: FormGroup) {
    this.myFormGroup = formGroup;
  }

  getFormGroup() {
       return this.myFormGroup;
  }
}
