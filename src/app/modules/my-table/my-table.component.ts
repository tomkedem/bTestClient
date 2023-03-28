import {SelectionModel} from '@angular/cdk/collections';
import {Component,ViewChild,OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { Customers, CustomersService } from 'src/api';
import { FormBuilder } from '@angular/forms';
import { TableTemplate } from 'src/app/shared/TableTemplate';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from 'src/app/shared/edit-dialog/edit-dialog.component';
import { DataService } from 'src/app/services/data.service';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';
@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements OnInit{

  constructor(private dataService: DataService,private fb: FormBuilder
    ,private dialog: MatDialog
    ,private customersService: CustomersService){}

searchForm = this.fb.group({
pageNumber: 0,
pageSize: 7,    
orderByField: [''],
sort: [''], 
searchKey: [''],   
searchKeyFirstname:['']
});


userTestStatus:TableTemplate[]=[   
  { type:'string', key: 'name' ,lable: 'שם'},
  { type:'number', key: 'customerNumber',lable: 'מספר ח.פ' },
  { type:'string', key: 'city',lable: 'עיר'},
  { type:'string', key: 'street',lable: 'רחוב'},
  { type:'string', key: 'postalCode',lable: 'מיקוד'}    
];
    
displayedColumns: string[] = ['name','customerNumber', 'city','street','postalCode','contact','edit', 'delete'];

dataSource = new MatTableDataSource<Customers>([]);  
selection = new SelectionModel<any>(true, []);


length=0;

  page:number;
  
  pageSize=7
  pageEvent:PageEvent


  ngOnInit():void {
    this.getCustomers()
    this.dataService.$RefreshRquired.subscribe(res=>{
      this.getCustomers()
    })
    
  }
  openEditDialogContact(id){
    console.log(id);
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '900px',
      height: '600px',
      data: id
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.dataService.$RefreshRquired.next();
       
      }
    });
  }
  getCustomers(){
    this.customersService.getCustomers().subscribe({
      next: (res:any) => {
        this.dataSource=new MatTableDataSource(res);      
        this.length=res.length;      
      },
      error: (e) => console.error(e),
    })   
  }
  deleteRow(row: any): void {
    console.log('tom row==>', row);
    
    this.customersService.deletecustomer(row.id).subscribe({
      next: (res:any) => {
       
       
      },
      error: (e) => console.error(e),
    })   
    const index = this.dataSource.data.indexOf(row);
    this.dataSource.data.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.dataSource.data);     
  }
  AddRow(){
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: 0
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.$RefreshRquired.next();
       
      }
    });
  }
  openEditDialog(row: any): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: row
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // update the row data with the edited values
        row.name = result.name;
        row.email = result.email;
      }
    });
  }
  onPageChange(e:any){     
    // this.searchForm.patchValue({    
    //   pageNumber: e.pageIndex,
    //   pageSize: e.pageSize,     
    // })
    // this.getStudents();
   }
}
