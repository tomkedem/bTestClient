import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomersService } from 'src/api';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit{
  
  formCaption:string;
  bNew:boolean = false;
  ngOnInit(){
if(this.myForm.value.id==0){
  this.bNew=true
  this.formCaption="הוספת לקוח חדש";
}
else{
  
  this.formCaption="עריכת לקוח";
}
}
  constructor(
    private dataService:DataService,
    private fb: FormBuilder,
    private customersService: CustomersService,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  myForm = this.fb.group({
    name: [this.data.name, [Validators.required]],
    city: [this.data.city==''?null:this.data.city, [Validators.required]],
    street: [this.data.street==''?null:this.data.street, [Validators.required]],
    postalCode: [this.data.postalCode],
    id: [this.data.id==null?0:this.data.id],
    customerNumber:[this.data.customerNumber,[Validators.required]]
  });
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if(this.myForm.value.id>0) {
      this.myForm.controls.customerNumber.clearValidators();
    }else {
      this.myForm.controls.customerNumber.setValidators([Validators.required]);
    }
    console.log('this.myForm.value',this.myForm.value);
    
    
     if (this.myForm.valid) {
     
      if(this.myForm.value.id>0){        
          this.customersService.updateCustomers(this.myForm.value).subscribe({
            next: (res:any) => {
              this.dataService.$RefreshRquired.next();
            },
            error: (e) => console.error(e),
          })   
        this.dialogRef.close(this.myForm.value);
      }else{
        
        this.customersService.addCustomer(this.myForm.value).subscribe({
          next: (res:any) => {
            this.dataService.$RefreshRquired.next();
          },
          error: (e) => console.error(e),
        })   
      }
    
     }else {
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