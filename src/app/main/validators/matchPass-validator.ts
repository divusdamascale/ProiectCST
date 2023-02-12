import { ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';

export function matchPasswordValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ match: true });
      return { match: true };
    }
    matchingControl.setErrors(null);
    return null;
  };
}
