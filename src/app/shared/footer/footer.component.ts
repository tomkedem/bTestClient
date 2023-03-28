import { Component,NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  outputPath:string = 'www.bss-ltd.com';
}
