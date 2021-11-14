import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: any[] = []

  constructor(private productservice: ProductService , private toastr: ToastrService) { }

  ngOnInit(): void {

    this.productservice.getAllProduct().subscribe(
      result => {
        this.productList = result;
      },
      error => {
        console.log(error);

      }
    )
  }


  delete(p: any) {
    let index = this.productList.indexOf(p);
    this.productList.splice(index, 1);
    this.productservice.deleteProduct(p.product._id).subscribe(
      res => {
        this.toastr.error(res.message);
        
      },
      err => {
        console.log(err);

      }
    )
  }

}



