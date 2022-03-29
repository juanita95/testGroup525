import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorsService} from "../../utils/services/validator.service";
import {CommonSelect} from "../shared/models/common-models.model";
import {AlertsService} from "../../utils/services/alert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup({});
  public minDate: Date = new Date();
  public genders: CommonSelect[] =
    [{
      id: 0,
      text: 'Femenino'
    }, {
      id: 1,
      text: 'Masculino'
    }];

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertsService,
    private validatorService: ValidatorsService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  /**
   * build form
   */

  buildForm(): void {
    this.formRegister = this.formBuilder.group({
      gender: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.validatorService.regexEmail)]],
      address: ['', [Validators.required]],
      typeHome: ['',],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      comments: ['', [Validators.required]],
    });
  }

  /**
   * Validates the given field
   * @param fieldV
   */

  public invalidField(fieldV: string): boolean | undefined {
    const field = this.formRegister?.get(fieldV);
    return field?.touched && field.invalid;
  }

  /**
   *  Check errors
   *  @param controlName
   * @param errorName
   */

  public checkError(controlName: string, errorName: string): boolean  {
    return this.formRegister.controls[controlName].hasError(errorName);
  }

  /**
   * Validates all form fields and return the corresponding alert msg
   */

  public setAlertMsg(): string {
    if (this.checkError('email', 'pattern')) {
      return 'Por favor ingrese un correo valido';
    } else {
      return 'Ingrese todos los campos requeridos'
    }
  }

  /**
   * Show errors if data in label inputs are incorrect
   */

  private showErrorsInAlert(): void {
    this.formRegister.markAllAsTouched();
    const msg = this.setAlertMsg();
    this.alertService.showWarning(msg, '');
  }

  /**
   * save data user and show table if form doesn´t have errors
   */
  /**
   * update lawyer data if data in label inputs are correct and show modal
   */
  public async saveData() {
    console.log(this.formRegister.value)
    try {
    } catch (e) {
      console.error(e);
      this.alertService.showError('Ocurrió un error registrando el usuario');
    }
  }

  /*** get time zone and current date***/

  dateChange(date: any): void {

  }

  register(): void {
    this.formRegister.valid
      ? this.saveData()
      : this.showErrorsInAlert();
  }

}
