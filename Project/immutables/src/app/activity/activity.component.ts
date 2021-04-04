import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})

export class ActivityComponent implements OnInit {

  displayedColumns = ['position', 'Topic', 'Score', 'Date'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 
  ngOnInit() {
  }

}

export interface Element {
  Topic: string;
  position: number;
  Score: number;
  Date: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, Topic: 'Inheritance', Score: 25, Date: '3/3/2021'},
  {position: 2, Topic: 'Clases and Objects', Score: 36, Date: '21/2/2021'},
  {position: 3, Topic: 'Polymorphism', Score: 26, Date: '10/2/2021'},
  {position: 4, Topic: 'Classes Methods', Score: 28, Date: '1/2/2021'},
  {position: 5, Topic: 'Method Overloading', Score: 10, Date: '25/1/2021'},
  {position: 6, Topic: 'Method Overriding', Score: 12, Date: '20/1/2021'},
  {position: 7, Topic: 'Polymorphism', Score: 14, Date: '15/1/2021'},
  {position: 8, Topic: 'Clases and Objects', Score: 15, Date: '11/1/2021'},
  {position: 9, Topic: 'Inheritance', Score: 18, Date: '1/1/2021'},
  {position: 10, Topic: 'Method Overriding', Score: 20, Date: '30/12/2020'},
  {position: 11, Topic: 'Polymorphism', Score: 22, Date: '24/12/2020'},
  {position: 12, Topic: 'Method Overloading', Score: 24, Date: '20/12/2020'},
  {position: 13, Topic: 'Inheritance', Score: 26, Date: '18/12/2020'},
  {position: 14, Topic: 'Classes Methods', Score: 28, Date: '14/12/2020'},
  {position: 15, Topic: 'Method Overriding', Score: 30, Date: '10/12/2020'},
  {position: 16, Topic: 'Inheritance', Score: 32, Date: '1/12/2020'},
  {position: 17, Topic: 'Clases and Objects', Score: 35, Date: '23/11/2020'},
  {position: 18, Topic: 'Polymorphism', Score: 39, Date: '15/11/2020'},
  {position: 19, Topic: 'Classes Methods', Score: 39, Date: '12/11/2020'},
  {position: 20, Topic: 'Method Overriding', Score: 40, Date: '1/11/2020'},
];