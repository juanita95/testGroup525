import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorsService} from "../../utils/services/validator.service";
import {AlertsService} from "../../utils/services/alert.service";
import {Cities, GenderSelect, GendersEnum, Locations, States} from "./models/register.model";
import {RegisterService} from "./services/register.service";
import {UserService} from "../shared/services/user.service";
import {LoadingService} from "../../utils/services/loading.service";
import {Router} from "@angular/router";
import * as moment from "moment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup({});
  public locations: Locations[] = [];
  public currentDate: Date = new Date();
  public states: States[] | undefined = [];
  public countrySelected: string | undefined= '';
  public stateSelected: string | undefined= '';
  public citySelected: string | undefined = '';
  public dateSelected: string = '';
  public genderSelected: string | undefined = '';
  public canShowStateCity: boolean | undefined = false;
  public canRegisterAge: boolean = false;
  public errorValidationAge: boolean = false;
  public cities: Cities[] | undefined = [];
  public genders: GenderSelect[] =
    [{
      id: 0,
      gender: GendersEnum.MALE,
    }, {
      id: 1,
      gender: GendersEnum.FEMALE,
    }];

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertsService,
    private registerService: RegisterService,
    private userService: UserService,
    private router: Router,
    private loadingService: LoadingService,
    private validatorService: ValidatorsService,
  ) {
    this.buildForm();
  }

  async ngOnInit(): Promise<void> {
    await this.getLocation();
    await this.getUsers();
  }

  /**
   * build form
   */

  buildForm(): void {
    this.formRegister = this.formBuilder.group({
      sex: ['', [Validators.required]],
      date_birthday: ['', [Validators.required]],
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.validatorService.regexEmail)]],
      addres: ['', [Validators.required]],
      typeHome: [''],
      country: ['', [Validators.required]],
      Deparment: [''],
      City: [''],
      comment: ['', [Validators.required]],
    });
  }

  /**
   * get locations
   */

  async getLocation(): Promise<void> {
    this.loadingService.setLoading(true);
    try {
      this.locations = await this.registerService.getLocation();
    } catch (e) {
      console.error(e);
      this.alertService.showError('Ocurrió un error obteniendo las locaciones');
    }
    this.loadingService.setLoading(false);
  }

  /** get users **/

  async getUsers(): Promise<void> {
    this.loadingService.setLoading(true);
    try {
      await this.userService.getAllUsers();
    } catch (e) {
      console.error(e);
      this.alertService.showError('Ocurrió un error registrando el usuario');
    }
    this.loadingService.setLoading(false);
  }

  /**
   * get country selected
   */

  getCountrySelected(countrySelected: number): void {
    const locationSelected = this.locations.find((country: Locations) => country.id === countrySelected);
    this.states = locationSelected?.states;
    this.canShowStateCity = locationSelected?.name.toLowerCase().includes('colombia');
    this.countrySelected = locationSelected?.name;
  }

  /**
   * get state selected
   */

  getStateSelected(stateSelected: number): void {
    const cities = this.states?.find((state: States) => state.id === stateSelected);
    this.cities = cities?.cities;
    this.stateSelected = cities?.name;
  }

  /**
   * get gender selected
   */

  getGenderSelected(genderSelected: number): void {
    const gender = this.genders.find((gender: GenderSelect) => gender.id === genderSelected);
    this.genderSelected = gender?.gender;
  }

  /**
   * get city selected
   */

  getCitySelected(citySelected: number): void {
    const cities = this.cities?.find((city: Cities) => city.id === citySelected)
    this.citySelected = cities?.name;
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

  public checkError(controlName: string, errorName: string): boolean {
    return this.formRegister.controls[controlName].hasError(errorName);
  }

  /**
   * Validates all form fields and return the corresponding alert msg
   */

  public setAlertMsg(): string {
    if (this.checkError('email', 'pattern')) {
      return 'Por favor ingrese un correo valido';
    } if (!this.canRegisterAge){
      return 'No puede ingresar si es menor de edad';
    }
      else {
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

  public async saveData(): Promise<void> {
    this.loadingService.setLoading(true);
    try {
      const sendUser = this.formRegister.value;
      sendUser.City = this.citySelected;
      sendUser.Deparment = this.stateSelected;
      sendUser.country = this.countrySelected;
      sendUser.date_birthday = this.dateSelected;
      sendUser.sex = this.genderSelected;
      this.userService.users = this.userService.users.concat(sendUser);
      this.userService.reloadUsers.next(true)
      // await this.userService.postUser(sendUser);
      await this.router.navigateByUrl('/usuarios')
    } catch (e) {
      console.error(e);
      this.alertService.showError('Ocurrió un error registrando el usuario');
    }
    this.loadingService.setLoading(false);
  }

  /*** get date and validate age ***/

  dateChange(date: any): void {
    this.dateSelected = moment(date).format('YYYY-MM-DD');
    let validation;
    const MIN_AGE = 18;
    const userMonthBirth = new Date().getMonth() - new Date(date).getMonth();
    const userDayBirth = new Date().getDate() - new Date(date).getDate();
    if (userMonthBirth === 0) {
      validation = userDayBirth >= 0
    } else {
      validation = userMonthBirth > 0;
    }
    const userAge = validation
      ? (new Date().getFullYear() - new Date(date).getFullYear())
      : (new Date().getFullYear() - new Date(date).getFullYear()) - 1
    this.canRegisterAge = userAge >= MIN_AGE;
    this.errorValidationAge = !this.canRegisterAge || this.formRegister.value.birthDate === '';
  }

  /*** validate information ***/

  register(): void {
    this.errorValidationAge = !this.canRegisterAge || this.formRegister.value.birthDate === '';
    let validation;
    if (this.canShowStateCity) {
      validation = this.formRegister.valid && this.canRegisterAge && this.formRegister.value.City !== '' && this.formRegister.value.Deparment !== '';
    } else {
      validation = this.formRegister.valid && this.canRegisterAge
    }
    validation
      ? this.saveData()
      : this.showErrorsInAlert();
  }

}
