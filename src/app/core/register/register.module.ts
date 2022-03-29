import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialDesignerModule} from "../../material-designer/material-designer.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignerModule,
    RegisterRoutingModule,
    SharedModule,
  ]
})
export class RegisterModule { }
