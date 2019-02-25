import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../services/service.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:String;
  username:String;
  email:String;
  password:String;

  constructor(private service:ServiceService, private flashMessage:FlashMessagesService, private auth:AuthService, private router: Router) { }

  ngOnInit() {
  }
  OnRegisterSubmit(){
    const user={
      name:this.name,
      email: this.email,
      username:this.username,
      password:this.password

    }

    if(!this.service.validateRegister(user)){
      this.flashMessage.show("fill all field", {cssClass: 'alert-danger', timeout:3000});
      return false;
      
    }
    
     if(!this.service.validateEmail(user.email)){
       this.flashMessage.show("use valid email", {cssClass:'alert-danger', timeout:3000});
       return false;
     
     }

     this.auth.registerUser(user).subscribe(data=>{
       if(data){
         this.flashMessage.show('you are now register and can login',{cssClass:'alert-success',timeout:3000})
         this.router.navigate(['/login']);
       }else{
         this.flashMessage.show('something went wrong',{cssClass:'alert-danger',timeout:3000});
         this.router.navigate(['/register'])
       }
     })



    }

}
