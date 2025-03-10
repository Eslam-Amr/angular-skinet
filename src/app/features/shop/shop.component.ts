import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/product';
import {  MatCard } from '@angular/material/card';
import {  MatDialog } from '@angular/material/dialog';
import { ProductItemComponent } from "./product-item/product-item.component";
import { MatButton } from '@angular/material/button';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ShopParams } from '../../shared/models/shopParams';
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [MatCard, ProductItemComponent,
  MatButton,
  MatIcon,
  MatMenu
  ,MatSelectionList, MatListOption,MatMenuTrigger,MatPaginator,FormsModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  // title = 'Skinet';
  private dialogService = inject(MatDialog);
  // products :Product []=[];
  products? :Pagination<Product>;
  // selectedBrands : string []=[];
  // selectedTypes : string []=[];
  // selectedSort  : string ='name';
  pageSizeOptions =[5,10,15,20];
  sortOptions = [
   {name : 'Alphabetical',value:'name'},
   {name : 'Price: Low-High',value:'priceAsc'},
   {name : 'Price: High-Low',value:'priceDesc'},
  ]
  shopParams = new ShopParams();

  ngOnInit(): void {
    this.initializeShop();
  }
  initializeShop(){
    this.shopService.getBrands();
    this.shopService.getTypes();
    // this.shopService.getProducts().subscribe({
    //   next : response => this.products = response.data,
    //   error : error => console.log(error),
    //   // complete : () => console.log('completed')


    // });
    this.getProducts()
}
getProducts(){
  // this.shopService.getProducts(this.selectedBrands,this.selectedTypes,this.selectedSort).subscribe({
  //   next : response => this.products = response.data,
  //   error : error => console.log(error),
  //   // complete : () => console.log('completed')


  // });
  this.shopService.getProducts(this.shopParams).subscribe({
    // next : response => this.products = response.data,
    next : response => this.products = response,
    error : error => console.log(error),
    // complete : () => console.log('completed')


  });
}
onSearchChange(){
  this.shopParams.pageNumber = 1;
  this.getProducts();
}
handlePageEvent(event :PageEvent){
  this.shopParams.pageNumber = event.pageIndex+1;
  this.shopParams.pageSize = event.pageSize;
  this.getProducts();

}
onSortChange(event : MatSelectionListChange){
  const selectedOption = event.options[0];
  if(selectedOption){
    // this.selectedSort=selectedOption.value;
    this.shopParams.sort=selectedOption.value;
    this.shopParams.pageNumber=1;
this.getProducts();
  }
}
openFiltersDialog(){
  const dialogRef = this.dialogService.open(FiltersDialogComponent,{
    minWidth:'500px',
    data:{
      selectedBrands: this.shopParams.brands,
      selectedTypes: this.shopParams.types
    }
  });
  dialogRef.afterClosed().subscribe({
    next:result =>{
      if(result){
        console.log(result);
this.shopParams.brands  = result.selectedBrands;
this.shopParams.types  = result.selectedTypes;
this.shopParams.pageNumber  = 1;
// this.shopService.getProducts(this.selectedBrands,this.selectedTypes).subscribe({
// next : response => this.products = response.data,
// error : error => console.log(error)
// });
this.getProducts();
      }
    }
  });
}

}
