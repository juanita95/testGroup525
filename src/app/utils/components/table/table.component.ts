import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  EventEmitter,
  Output, OnDestroy, OnChanges, SimpleChanges,
} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {BehaviorSubjectService} from "../../services/behavior-subject.service";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {AdminUsersService} from "../../../user-management/services/admin-users-service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})

export class TableComponent extends MatPaginatorIntl implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @Input() columns: string[];
  @Input() columnsName: string[];
  @Input() arrayElements: any;
  @Output() dataModal = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<any>;
  public sizeUsersTable: number = 6;
  public endIndex: number;
  public isCollapsedSB: boolean;
  public positionsImg: number;
  private subscription$: Subscription = new Subscription();

  constructor(
    private behaviorSubjectService: BehaviorSubjectService,
    public dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.arrayElements);
    this.getEventObservable();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.arrayElements && changes.arrayElements.currentValue.length !== 0) {
      this.ngAfterViewInit();
    }
  }

  /** set  paginator **/

  ngAfterViewInit(): void {
    const TIME_TO_RENDER = 100;
    setTimeout(()=>{
        this.displayedColumns = this.columns;
        this.dataSource = new MatTableDataSource(this.arrayElements);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.endIndex = Math.ceil(this.arrayElements.length / this.sizeUsersTable)
      },
      TIME_TO_RENDER);
  }

  /** set range of paginator **/

  getRangeLabel = (page: number, pageSize: number, length: number) =>  {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }

    const startIndex = page;
    return `${startIndex + 1}`;
  }
  /** get data of observables for change styles when sidebar is collpased **/

  getEventObservable(): void{
    this.subscription$.add(
      this.behaviorSubjectService.bSubjectCollapseSB.subscribe((isCollapsed)=>{
        this.isCollapsedSB = isCollapsed;
      })
    );
  }

  /** send icon clicked **/

  openDialog(column:string, obj: any): void {
    const modalInfo = {column, obj};
    this.dataModal.emit(modalInfo);
  }

}
