import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

const router =inject(Router);

const snackbar = inject(SnackbarService);
  return next(req).pipe(
    catchError((error:HttpErrorResponse) => {
      console.error("Interceptor caught error:", error);

      if(error.status === 400){
        if(error.error.errors){
          const modelStateErrors =[];
          for(const key in error.error.errors){
            if(error.error.errors[key]){
              modelStateErrors.push(error.error.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }else
        snackbar.error(error.error.title ||error.error)
        // alert(error.error.title ||error.error)
        // router.navigate(['/login']);
      }
      if(error.status === 401){
        // alert(error.error.title ||error.error)
        snackbar.error(error.error.title ||error.error)

      }
      if(error.status === 404){
        // alert(error.error.title ||error.error)
        console.log("in 404 error");
        router.navigate(['/not-found']);

      }

      if(error.status === 500){
        // console.log("in 500 error");
        const navigationExtras : NavigationExtras ={state:{error:error.error}};

        // alert(error.error.title ||error.error)
        router.navigateByUrl('/server-error',navigationExtras);

      }

      return throwError(()=>error);
    })
  );

};
