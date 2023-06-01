import { CustomerListPage } from './../customer-list/customer-list';
import { TranslateService } from '@ngx-translate/core';
import { Camera } from '@ionic-native/camera';
import { DbserviceProvider } from './../../providers/dbservice/dbservice';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, Content, ActionSheetController, AlertController, LoadingController, ModalController, ToastController } from 'ionic-angular';

/**
 * Generated class for the CustomeraddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customeradd',
  templateUrl: 'customeradd.html',
})
export class CustomeraddPage {

  @ViewChild(Content) content: Content;
  data:any={};
  state_list:any=[];
  district_list:any=[];
  city_list:any=[];
  pincode_list:any=[];
  selectedFile:any=[];
  file_name:any=[];
  karigar_id:any='';
  formData= new FormData();
  myphoto:any;
  profile_data:any='';
  loading:Loading;
  today_date:any;
  country:any;
  url:string='';
  saveFlag: boolean;
  nextFormValue: boolean=true;
  resendActiveClass:boolean = false;
  mobile: any;
  otp: any;
  form: any;
  smsOTP: number;
  mobile_no: any;
    id: any;
    customer_details: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService:DbserviceProvider,
    public alertCtrl:AlertController,
    public translate:TranslateService,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    public toastCtrl :ToastController,
    private loadingCtrl:LoadingController,
    public modalCtrl: ModalController) {
      this.getstatelist();
      this.starter();
      this.data.mobileNo = this.navParams.get('mobile_no');
      console.log(this.data);
      

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomeraddPage');
    if (this.data.state) {
      this.getDistrictList(this.data.state);
  }

  }



  getstatelist(){
    this.dbService.get_rqst('app_master/getStates').subscribe( r =>
        {
            console.log(r);
            this.state_list=r['states'];
            this.karigar_id=r['id'];
            console.log(this.state_list);
        });
    }
    getDistrictList(state_name)
    {
        console.log(state_name);
        this.dbService.post_rqst({'state_name':state_name},'app_master/getDistrict')
        .subscribe( (r) =>
        {
            console.log(r);
            this.district_list=r['districts'];
            console.log(this.state_list);
        });
    }
    
    getCityList(district_name)
    {
        console.log(district_name);
        this.dbService.post_rqst({'district_name':district_name},'app_master/getCity')
        .subscribe( (r) =>
        {
            console.log(r);
            this.city_list=r['cities'];
            this.pincode_list=r['pins'];
            console.log(this.pincode_list);
        });
    }
    
    getaddress(pincode)
    {
        if(this.data.pincode.length=='6')
        {
            this.dbService.post_rqst({'pincode':pincode},'app_karigar/getAddress')
            .subscribe( (result) =>
            {
                console.log(result);
                var address = result.address;
                if(address!= null)
                {
                    this.data.state = result.address.state_name;
                    this.getDistrictList(this.data.state)
                    this.data.district = result.address.district_name;
                    this.data.city = result.address.city;
                    console.log(this.data);
                }
            });
        }
        
    }


    presentLoading() 
{
    this.translate.get("Please wait...")
    .subscribe(resp=>{
        this.loading = this.loadingCtrl.create({
            content: resp,
            dismissOnPageChange: false
        });
        this.loading.present();
    })
    
}

scrollUp()
{
    this.content.scrollToTop();
} 

caps_add(add:any)
{
    this.data.address = add.replace(/\b\w/g, l => l.toUpperCase());
}

MobileNumber(event: any) {
  const pattern = /[0-9]/;
  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
  }
}

namecheck(event: any) 
{
    console.log("called");
    
    const pattern = /[A-Z\+\-\a-z ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) 
    {event.preventDefault(); }
}


presentToast() {
  const toast = this.toastCtrl.create({
      message: `${this.data.mobile_no} This mobile number has already been registered please use another number.`,
      duration: 3000,
  });
  toast.present();
}


CheckCustomer(mobile)
{
  
  console.log(mobile);
  
  
  
  if(mobile.length == 10){
    this.dbService.post_rqst( {'mobile_no':mobile},'app_karigar/check_customer')
    .subscribe( (r) =>
    {


      if(r.status == 'EXIST'){
        this.presentToast();
        return;
    }
      console.log(r,'check customer');
      this.customer_details = r.customer_details;
      this.id = r.customer_details.id;
      console.log(this.id,this.customer_details);
      

      


    

     
   
    });
  }
 
  
}

brandStarter:any =[];

starter(){
  this.dbService.post_rqst({},'app_master/get_brand_starter').subscribe( r =>
      {
          console.log(r);
          this.brandStarter=r['brand_starter'];
      });
  }

scan_tips()
{
  this.CheckCustomer('');
}

showAlert(text)
{
  let alert = this.alertCtrl.create({
    title:'Alert!',
    cssClass:'action-close',
    subTitle: text,
    buttons: [ {
      text: 'Scan again',
      handler: () => {
        this.scan_tips();
      }
    },
    {
      text: 'Okay',
      handler: () => {
        
      }
    }
  ]
});
alert.present();
}
    submit(id,customer_details)
    {
        console.log(id,customer_details);
        
        console.log('data');
        console.log(this.data);
this.data.breeder_id = this.dbService.karigar_id;
// this.data.customer_id= this.id;
// this.data.customer_details=this.customer_details;
        this.presentLoading();
       
        console.log(this.data);
        this.dbService.post_rqst({'data':this.data},'app_karigar/addCustomer')
        .subscribe( (r) =>
        {
            console.log(r);
            this.loading.dismiss();
            this.navCtrl.popTo(CustomerListPage);
            
           
        });
    }
}
