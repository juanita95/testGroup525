import {Injectable, OnInit} from '@angular/core';
import {User, UserData} from "../models/common-models.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import {LoadingService} from "../../../utils/services/loading.service";
import {AlertsService} from "../../../utils/services/alert.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService{

  public users: UserData[] = [];
  public reloadUsers: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private loadingService: LoadingService,
    private alertService: AlertsService,
  ) {}

  /** post user**/

  async postUser(user: User): Promise<User>{
    const result = await this.httpClient.post<User>(`${environment.api}/users.json`, user).toPromise();
    return result;
  }

  /** get users**/

  async getUsers(): Promise<User> {
    const result = await this.httpClient.get<User>(`${environment.api}/users.json`).toPromise();
    return result;
  }

  async getAllUsers(): Promise<void> {
    this.loadingService.setLoading(true);
    try{
      const users = await this.getUsers();
      this.users = users.users;
    } catch (e) {
      console.error(e);
      this.alertService.showError('Ocurrió un error registrando el usuario');
    }
    this.loadingService.setLoading(false);
  }
}
