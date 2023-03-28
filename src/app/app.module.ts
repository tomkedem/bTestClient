import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MyTableComponent } from './modules/my-table/my-table.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { BASE_PATH } from 'src/api';
import { environment } from 'src/environments/environment';
import { getPortuguesPaginatorIntl } from './shared/paginator.translate';
import { MatIconModule } from '@angular/material/icon';
import { EditDialogComponent } from './shared/edit-dialog/edit-dialog.component';
import { ErrorComponent } from './shared/error/error/error.component';
import { MatButtonModule } from '@angular/material/button';
import { ContactDialogComponent } from './modules/contact-dialog/contact-dialog.component';
import { ContactAddDialogComponent } from './modules/contact-add-dialog/contact-add-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    MyTableComponent,
    EditDialogComponent,
    ErrorComponent,
    ContactDialogComponent,
    ContactAddDialogComponent
   
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,    
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule ,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [{   provide: BASE_PATH, useValue: environment.apiUrl },
 
    { provide: MatPaginatorIntl, useValue: getPortuguesPaginatorIntl() }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
