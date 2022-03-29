import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  private _regexEmail = '[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,3}$';
  constructor() {
  }

  get regexEmail(): string {
    return this._regexEmail;
  }

}
