import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/shared/service/authentication.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  formGroup: FormGroup;
  errorMessage: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(): void {
    if(this.formGroup.valid){
      
      this.authService.login(this.formGroup.value).subscribe(
        (res) => {
          if (res != null) {
            this.errorMessage = '';
            localStorage.setItem('User', JSON.stringify(res));
            this.router.navigateByUrl('app/dashboard');
          }
        },
        (error) => {
          console.log(error);
          this.errorMessage = 'errore';
        }
      )
    }
    else{
      console.log('invalid')
    }
    
  }

}
