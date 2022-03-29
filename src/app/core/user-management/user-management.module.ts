import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import {SharedModule} from "../shared/shared.module";
import {MaterialDesignerModule} from "../../material-designer/material-designer.module";
import { UserManagementComponent } from './user-management.component';

@NgModule({
  declarations: [
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule,
    MaterialDesignerModule,
  ]
})
export class UserManagementModule { }
