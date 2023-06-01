import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoupanCodePage } from './coupan-code';
import { createTranslateLoader } from '../../redeem-type/redeem-type.module';

@NgModule({
  declarations: [
    CoupanCodePage,
  ],
  imports: [
    IonicPageModule.forChild(CoupanCodePage),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    })
  ],
})
export class CoupanCodePageModule {}
