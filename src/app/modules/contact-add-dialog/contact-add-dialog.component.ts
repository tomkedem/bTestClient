import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactsService } from 'src/api';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact-add-dialog',
  templateUrl: './contact-add-dialog.component.html',
  styleUrls: ['./contact-add-dialog.component.css']
})
export class ContactAddDialogComponent implements OnInit{
  
  formCaption:string;
  
  
  constructor(
    private dataService:DataService,
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private dialogRef: MatDialogRef<ContactAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log('dd=>>', this.data);
    
  }
  
  myForm = this.fb.group({
    fullName: ['', [Validators.required]],
    officeNumber: [''],
    email: [''],
    fax: [''],
    mobile: [''],
    passportNumber:['',[Validators.required]],
    idNumber:['',[Validators.required]],
    customerId:this.data
  });
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    
    console.log('this.myForm.value',this.myForm.value);    
    
     if (this.myForm.valid) {
        this.contactsService.addContact(this.myForm.value).subscribe({
          next: (res:any) => {
            this.dataService.$RefreshContactRquired.next();
          },
          error: (e) => console.error(e),
        })   
      }
    
     else {
       this.validateAllFormFields(this.myForm)
     }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}