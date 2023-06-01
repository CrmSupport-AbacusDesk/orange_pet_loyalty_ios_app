import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomeraddPage } from './customeradd';
import { createTranslateLoader } from '../redeem-type/redeem-type.module';

@NgModule({
  declarations: [
    CustomeraddPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomeraddPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
})
export class CustomeraddPageModule {}
