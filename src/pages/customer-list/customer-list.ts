import { CustomeraddPage } from './../customeradd/customeradd';
import { DbserviceProvider } from './../../providers/dbservice/dbservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { CustomerDetailPage } from '../customer-detail/customer-detail';

/**
 * Generated class for the CustomerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-list',
  templateUrl: 'customer-list.html',
})
export class CustomerListPage {

  flag:any='';
  filter:any = {};
  loading:Loading;
  
  customer: any[];
  cust_list: string = "Pending";

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService:DbserviceProvider,
    public alertCtrl:AlertController, public loadingCtrl:LoadingController) {
      this.presentLoading();
      this.getCustomerList(this.cust_list, '');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerListPage');
  }


  presentLoading()
  {
    this.loading = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  
  doRefresh(refresher)
  {
    this.getCustomerList(this.cust_list, '');
    refresher.complete();
  }
  

  goOnDetailPage(id){
    this.navCtrl.push(CustomerDetailPage,{'id':id})
  }

  onCancel(event){
    console.log(event);
    
  }

  getCustomerList(status, search)
  {
    this.flag=0;
    this.filter.limit = 0;
    this.filter.search = search;
    this.filter.status = status;
    
    
    
    this.dbService.post_rqst( {'filter':this.filter,'breeder_id' : this.dbService.karigar_id}, 'app_karigar/breeder_customer_details').subscribe(response =>
      {
        console.log(response);
        this.loading.dismiss();
        this.customer = response.customer_details;
       console.log(this.customer);

      });
    }
    
    loadData(infiniteScroll)
    {
      
      this.filter.limit=this.customer.length;

      this.dbService.post_rqst({'filter' : this.filter  ,'breeder_id' : this.dbService.karigar_id},'app_karigar/breeder_customer_details').subscribe( r =>
        {
          
          let resData = r.customer_details;

          if(resData =='')
          {
            this.flag=1;
          }
          else
          {
            setTimeout(()=>{
              this.customer=this.customer.concat(resData);
              console.log(this.customer);
              infiniteScroll.complete();
            },1000);
          }
        });
      }

     

  goOnCustomerAdd(){
    this.navCtrl.push(CustomeraddPage)
  }

}
