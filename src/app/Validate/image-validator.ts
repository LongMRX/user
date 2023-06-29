import { FormControl } from '@angular/forms';

export class ImageValidator {
  static imageSizeValidator(maxSize: number) {
    return function (input: FormControl) {
      if (input.value[0]) {
        return input.value[0].size > maxSize ? {maxSize: true} : null;
      }
      return null;
    };
  }

  static imageExtensionValidator(whiteListImageExtension: Array<string>) {
    return function(input: FormControl) {
      if (input.value[0]) {
        return whiteListImageExtension.includes(input.value[0].type) ? null : {extension: true};
      }
      return null;
    };
  }
}
