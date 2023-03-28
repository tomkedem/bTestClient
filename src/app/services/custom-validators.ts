import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


function isValidIsraeliId(tz: any): boolean {
  if (tz) {
    var id = tz.trim();
    if (id.length > 9 || id.length < 5 || !/^\d+$/.test(id)) return false;

    // Pad string with zeros up to 9 digits
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

    return Array
      .from(id, Number)
      .reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
      }) % 10 === 0
  }
  else if (tz == '') {
    return true
  }
}
export class CustomValidators {

  static notValidId(errorMessage: string | null): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

      // check condition
      return isValidIsraeliId(control.value) ?
        null :
        {
          notValidId: true
        };
    }
  }


}
