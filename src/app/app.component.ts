import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';
import { ShopService } from './core/services/shop.service';
import { ShopComponent } from "./features/shop/shop.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ShopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // baseUrl = 'https://localhost:5001/api/';
  // private htpp = inject(HttpClient);
  // private shopService = inject(ShopService);
  // title = 'Skinet';
  // products :Product []=[];
  // // constructor(private http: HttpClient){}
  // ngOnInit(): void {
  // this.htpp.get<Pagination<Product>>(this.baseUrl+'products').subscribe({
  //   next : response => this.products = response.data,
  //   error : error => console.log(error),
  //   complete : () => console.log('completed')


  // });
  // }

  // ngOnInit(): void {
  // this.shopService.getProducts().subscribe({
  //   next : response => this.products = response.data,
  //   error : error => console.log(error),
  //   // complete : () => console.log('completed')


  // });
  // }
  title = 'Skinet';

}
