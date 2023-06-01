import { DbserviceProvider } from './../../providers/dbservice/dbservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the CustomerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
})
export class CustomerDetailPage {

  karigar_id:any
  complain_detail: any[];
  url:string='';
  loading:Loading;
  coupon:any = {};
  dealerDetail:any = {};
  flag:any='';
  filter:any = {};
  status: any;
  comType:any ={}
  customer_details: any={};
  customer_id: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public dbService:DbserviceProvider, public translate:TranslateService, public loadingCtrl:LoadingController) {

  }

  ionViewDidLoad() {
    this.presentLoading();
    console.log('ionViewDidLoad CustomerDetailPage');
    this.customer_id = this.navParams.get('id');
    console.log(this.customer_id);
    
    this.getCustomertDetail();
  }
  presentLoading() 
  {
      this.translate.get('Please wait...')
      .subscribe(resp=>{
          this.loading = this.loadingCtrl.create({
              content: resp,
              dismissOnPageChange: false
          });
          this.loading.present();
      })
  }

  getCustomertDetail()
  {
    this.dbService.post_rqst( {'customer_id':this.customer_id,}, 'app_karigar/customer_details').subscribe(response =>
      {
        console.log(response);
        this.loading.dismiss();
        this.customer_details = response.customer_details;
        console.log( this.customer_details );
        
        this.coupon = response.coupon_detail;
        this.dealerDetail = response.dealer_details;

      });
    }
}
