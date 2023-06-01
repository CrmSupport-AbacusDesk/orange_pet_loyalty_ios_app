import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerDetailPage } from './customer-detail';
import { createTranslateLoader } from '../redeem-type/redeem-type.module';

@NgModule({
  declarations: [
    CustomerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerDetailPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
})
export class CustomerDetailPageModule {}
