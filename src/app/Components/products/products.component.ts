import { Component, inject, OnInit } from '@angular/core';
import { ProductElementComponent } from './inner/product-element/product-element.component';
import { ProductService } from '../../services/product/product.service';
import { GetAllProducts } from '../../interfaces/product/get-all-products';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductElementComponent, ReactiveFormsModule, MatPaginatorModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  readonly productService = inject(ProductService);

  searchText = '';
  page:any = 0;
  size:any = 5;
  count:any = 0;
  // rate:any = 0;

  searchForm: FormGroup = new FormGroup({
    text: new FormControl('')
  });

  products: GetAllProducts | null = null;

  ngOnInit(): void {
      this.loadAllProducts();

      this.searchForm.valueChanges.pipe(debounceTime(1000)).subscribe(data => {
        this.searchText = data.text;
        this.loadAllProducts();
      })
  }

  // load the all products...
  loadAllProducts(){
    this.productService.getAll(this.searchText,this.page,this.size).subscribe(response => {
      console.log(response);
      this.products = response;
      this.count = this.products?.object.count;
    }, error => {
      console.log(error?.error?.message);
    })
  }

  getServerData(data:PageEvent){
    this.page = data?.pageIndex;
    this.size = data?.pageSize;
    this.loadAllProducts();
  }
}
