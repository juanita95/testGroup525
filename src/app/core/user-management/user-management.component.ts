import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserData} from "../shared/models/common-models.model";
import {UserService} from "../shared/services/user.service";
import {AlertsService} from "../../utils/services/alert.service";
import {LoadingService} from "../../utils/services/loading.service";
import {Location} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {

  public users: UserData[] = [];
  public isUsersReload: boolean = false;
  public columnsUserAdmin: string[] = ['name', 'last_name', 'email', 'addres', 'country', 'Deparment', 'City', 'comment', 'date_birthday', 'sex'];
  public columnsNames: string[] = ['Nombre', 'Apellido', 'Correo electrónico', 'Dirección', 'País', 'Departamento', 'Ciudad', 'Comentario', 'Fecha de nacimiento', 'Genero'];
  private subscription$: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private loadingService: LoadingService,
    private location: Location,
    private alertService: AlertsService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.reloadUsers();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  /** reload data user **/
  reloadUsers(): void{
    this.subscription$.add(
      this.userService.reloadUsers.subscribe(async(reload) => {
        this.isUsersReload = reload;
        await this.getUsers();
      })
    )
  }

  /** get users **/

  async getUsers(): Promise<void> {
    this.loadingService.setLoading(true);
    try{
      !this.isUsersReload ? await this.userService.getAllUsers() : '';
      this.users = this.userService.users;
    } catch (e) {
      console.error(e);
      this.alertService.showError('Ocurrió un error registrando el usuario');
    }
    this.loadingService.setLoading(false);
  }

  /** back to last route */

  backNavigate(): void{
    this.location.back();
  }

}
