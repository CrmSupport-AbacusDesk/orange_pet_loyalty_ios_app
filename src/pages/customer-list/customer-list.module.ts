import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerListPage } from './customer-list';
import { createTranslateLoader } from '../redeem-type/redeem-type.module';

@NgModule({
  declarations: [
    CustomerListPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerListPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
})
export class CustomerListPageModule {}
