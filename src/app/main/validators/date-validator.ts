import { FormControl } from '@angular/forms';

export function dateValidator(control: FormControl) {
  const inputDate = new Date(Date.parse(control.value));
  const currentDate = new Date();
  if (inputDate.getFullYear() < currentDate.getFullYear()) {
    return { isless: true };
  } else if (inputDate.getMonth() < currentDate.getMonth()) {
    return { isless: true };
  } else if (inputDate.getDate() < currentDate.getDate()) {
    return { isless: true };
  }

  return null;
}
