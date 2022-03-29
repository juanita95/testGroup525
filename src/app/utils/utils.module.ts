import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorIntl} from "@angular/material/paginator";
import {TableComponent} from "./components/table/table.component";
import {MaterialDesignerModule} from "../material-designer/material-designer.module";

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    MaterialDesignerModule,
  ],
  exports: [TableComponent],
  providers: [{
    provide: MatPaginatorIntl,
    useClass: TableComponent
  }],
})
export class UtilsModule { }
