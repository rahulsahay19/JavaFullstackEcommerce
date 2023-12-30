import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error)=>{
        if(error.status === 404){
          this.toastr.error('404 error happened');
          this.router.navigate(['/not-found']);
        }
        else if(error.status === 500){
          this.toastr.error("500 error happened");
          this.router.navigate(['/server-error']);
        }
        //Passing the error along to the next error handling middleware
        throw error;
      })
    )
  }
}
