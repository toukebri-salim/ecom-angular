import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../../services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categoryList: any[] = []
  productList: any[] = []

  constructor(private categoryService: CategoryService, private toastr: ToastrService, private productservice: ProductService) { }

  ngOnInit(): void {


    this.categoryService.getAllCategory().subscribe(
      result => {
        this.categoryList = result;
      },
      error => {
        console.log(error);

      }
    )

    this.productservice.getAllProduct().subscribe(
      result => {
        this.productList = result;
      },
      error => {
        console.log(error);

      }
    )
  }




}



