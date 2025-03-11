import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { ShopParams } from '../../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  // baseUrl = 'https://localhost:5000/api/';
  baseUrl = 'http://localhost:5000/api/';
  private http = inject(HttpClient);
  types:string []=[];
  brands:string []=[];

getProducts(shopParams : ShopParams){
  let params = new HttpParams();
  if(shopParams.brands.length >0)
    params = params.append('brands',shopParams.brands.join(','));
  if(shopParams.types.length>0)
    params = params.append('types',shopParams.types.join(','));
  if(shopParams.sort)
    params = params.append('sort',shopParams.sort);
  if(shopParams.search)
    params = params.append('search',shopParams.search);
    params = params.append('pageSize',shopParams.pageSize);
    params = params.append('pageIndex',shopParams.pageNumber);
  return this.http.get<Pagination<Product>>(this.baseUrl+'products',{params})
  // return this.http.get<Pagination<Product>>(this.baseUrl+'products')

}
// getProducts(brands?:string[],types ?:string[],sort ? : string){
//   let params = new HttpParams();
//   if(brands && brands.length>0)
//     params = params.append('brands',brands.join(','));
//   if(types && types.length>0)
//     params = params.append('types',types.join(','));
//   if(sort)
//     params = params.append('sort',sort);
//     params = params.append('pageSize',20);
//   return this.http.get<Pagination<Product>>(this.baseUrl+'products',{params})
//   // return this.http.get<Pagination<Product>>(this.baseUrl+'products')

// }
getProduct(id :number)
{
  return this.http.get<Product>(this.baseUrl+'products/'+id)
}

getBrands(){
  if(this.brands.length>0)return ;
  return this.http.get<string[]>(this.baseUrl+'products/brands').subscribe({

    next : response =>this.brands=response
  });

}
getTypes(){
  if(this.types.length>0)return ;
  return this.http.get<string[]>(this.baseUrl+'products/types').subscribe({

    next : response =>this.types=response
  });

}
}
/*


For the following piece of code:
Sum = 0
MyFunction (N)
    M = 2,000,000,000
    If (N > 1)
      I = 2
     While N > 1 do
        Sum = 0
        J = 1
        Do
         Sum = Sum + J
         J = J + 500
        While J < N
        N = N / I
                    I = I * I
           End While

        If (MyFunction(N / 4) % 3 == 0)
                Return (2 * MyFunction(N / 4) - 0.5 * MyFunction(N / 4))
        Else If ((2 * MyFunction(N / 4)) % 4 == 0)
                Return (4 * MyFunction(N / 4))
        Else
                Return (6 * MyFunction(N / 4))
        End If
   Else
         i=0
         While (i<M){
                       i++;
                }
   End If
End MyFunction


*/
