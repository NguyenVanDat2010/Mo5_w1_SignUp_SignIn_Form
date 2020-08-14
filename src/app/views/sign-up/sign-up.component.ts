import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

interface IUser {
  id: number;
  email: string;
  password:string;
  cfPassword:string;
  country:string;
  age:number;
  gender:string;
  phone:number;
}

function comparePassword(c:AbstractControl){
  const v = c.value;
  return(v.password == v.cfPassword)?null:{
    passwordnotmatch: true
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm : FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      pwGroup:this.fb.group({
        password:['',[Validators.required, Validators.minLength(6)]],
        cfPassword:['',[Validators.required,Validators.minLength(6)]]
      },{validator:comparePassword}),
      country: ['',[Validators.required]],
      age: ['',[Validators.required, Validators.min(18)]],
      gender:['',[Validators.required]],
      phone: ['',[Validators.required, Validators.pattern(/^\+84\d{9,10}$/)]]
    });

    this.registerForm.patchValue({
      email: 'info@gmail.com',
      password: '123456'
    })
  }

  onSubmit(){
    console.log(this.registerForm);

  }

}
