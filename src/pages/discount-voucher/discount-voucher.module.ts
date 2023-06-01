import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscountVoucherPage } from './discount-voucher';
import { createTranslateLoader } from '../redeem-type/redeem-type.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    DiscountVoucherPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscountVoucherPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
})
export class DiscountVoucherPageModule {}
