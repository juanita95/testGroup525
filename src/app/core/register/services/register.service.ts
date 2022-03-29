import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Locations} from "../models/register.model";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  /** get location**/

   async getLocation(): Promise<Locations[]>{
    const result = await this.httpClient.get<Locations[]>(`../../assets/data/location.json`).toPromise();
    return result;
  }

}
