import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'registro',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'registro'
  },
  {
    path: '**', redirectTo: 'registro', pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
