import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Contacts, ContactsService } from 'src/api';
import { DataService } from 'src/app/services/data.service';
import { TableTemplate } from 'src/app/shared/TableTemplate';
import { ContactAddDialogComponent } from '../contact-add-dialog/contact-add-dialog.component';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css']
})
export class ContactDialogComponent implements OnInit{
  formCaption:string;
  bNew:boolean = false;
  ngOnInit(){
    this.getContacts()
    this.dataService.$RefreshContactRquired.subscribe(res=>{
      this.getContacts()
    })
}
dataSource = new MatTableDataSource<Contacts>([]);  
  constructor(
    private dataService:DataService,
    private dialog: MatDialog,
    private contactsService: ContactsService,
    private dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  userTestStatus:TableTemplate[]=[   
    { type:'string', key: 'fullName' ,lable: 'שם מלא'},
    { type:'string', key: 'officeNumber',lable: 'מספר במשרד' },
    { type:'string', key: 'email',lable: 'מייל'},
    { type:'string', key: 'fax',lable: 'פקס'},
    { type:'string', key: 'mobile',lable: 'נייד'},  
    { type:'string', key: 'passportNumber',lable: 'מספר דרכון'},
    { type:'string', key: 'idNumber',lable: 'מספר ת.ז'},
   
  ];
      
  displayedColumns: string[] = ['fullName','officeNumber', 'email','fax','mobile','passportNumber','idNumber'];
  

  AddRow(){
    console.log('AddRow');
    console.log(this.data);
    const dialogRef = this.dialog.open(ContactAddDialogComponent, {
      width: '900px',
      height: '600px',
      data: this.data
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.dataService.$RefreshRquired.next();
       
      }
    });
  }
  
  getContacts(){
    console.log('ll==>> ', this.data);
    
    this.contactsService.getContacts(this.data).subscribe({
      next: (res:any) => {
        this.dataSource=new MatTableDataSource(res);      
        console.log(res);
        
      },
      error: (e) => console.error(e),
    })   
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  

 
}
