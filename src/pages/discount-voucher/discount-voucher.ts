import { DbserviceProvider } from './../../providers/dbservice/dbservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Thumbnail } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
* Generated class for the DiscountVoucherPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-discount-voucher',
  templateUrl: 'discount-voucher.html',
})
export class DiscountVoucherPage {
  data:any={};
  complaint_detail: any[];
  id: any;
  status: any;
  
  
  constructor(public toastCtrl :ToastController,public navCtrl: NavController, public navParams: NavParams, public dbService:DbserviceProvider,public alertCtrl:AlertController) {
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscountVoucherPage');
  }
  
  
  CheckCoupon(coupon_code,id)
  {
    
    console.log(coupon_code, id);
    
    console.log(this.id);
    
    
    if(coupon_code.length == 12 || coupon_code.length == 13 || coupon_code.length == 14 || coupon_code.length == 15){ 
      this.dbService.post_rqst( {'coupon_code':coupon_code,'customer_id':this.id},'app_karigar/customer_assigned_coupon_check')
      .subscribe( (r) =>
      {
        this.status = r.status;
        console.log(this.status);
        console.log(r, 'check response');
        // if(r.status == 'coupon_not_exist'){
        //   this.showAlert('Invaild coupon number')
        //   return;
        // }
        // else if(r.status == 'coupon_used'){
        //   this.showAlert('Coupon code already used')
        // }
        
        // else if(r.status == 'coupon_not_assigned'){
        //   this.showAlert('Coupon code not assign')
        //   return;
        // } 
        // else if(r.status == 'coupon_not_assigned_this_customer'){
        //   this.showAlert('Coupon code not assign')
        //   return;
        // }
        // else{

        // }
        
      });
    }
    
    
  }
  
  karigar_id:any='';
  
  submit(){
    this.dbService.post_rqst( {'coupon_code':this.data.coupon_code,'dealer_id':this.dbService.karigar_id},'app_karigar/retailer_discount_scan')
    .subscribe( (r) =>
    {
      if(r.status == 'COUPON_NOT_EXIST'){
        this.showAlert('Invaild Coupon Number')
        return;
      }
      if(r.status == 'COUPON_NOT_ASSIGNED'){
        this.showAlert('Coupon code not assign')
        return;
      }
      if(r.status == 'sucess'){
        this.navCtrl.popTo(HomePage);
      }
    });
  }
  
  
  CheckCustomer(mobile)
  {
    if(mobile.length == 10){
      this.dbService.post_rqst( {'mobile_no':mobile},'app_karigar/check_customer_details')
      .subscribe( (r) =>
      {
        this.data.complaint_detail = r.customer_details.customer_name;
        this.id = r.customer_details.id;
        if(r.status == 'EXIST'){
          this.complaint_detail = r.customer_details.customer_name;
          this.CheckCoupon(this.id,'')
          return;
        }else if(r.status == 'NOT-EXIST'){
          this.showAlert('Customer not found this mobile number.')
        }
      });
    }
    
    
  }
  
  showAlert(text) {
    let alert = this.alertCtrl.create({
      title:'Alert!',
      cssClass:'action-close',
      subTitle: text,
      buttons: [
      {
        text:'OK',
        cssClass: 'close-action-sheet',
        handler:()=>{
          // this.navCtrl.push(TransactionPage);
        }
      }]
    });
    alert.present();
  }
  
}
