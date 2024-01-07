import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formsBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastService: ToastrService    
    ){
    this.loginForm = this.formsBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }
  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next: user => {
        const redirect = this.accountService.redirectUrl ? this.accountService.redirectUrl : '/store';
        this.router.navigateByUrl(redirect);
        this.accountService.redirectUrl = null; //clearing the redirect url post navigation
        this.toastService.success('Successfully Logged In');
        
      },
      error: () =>{
        this.toastService.error('Error Occurred during Login');
      }
    })
  }
}
