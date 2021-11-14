import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../../../../services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categoryList: any[] = []

  constructor( private categoryService: CategoryService,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.categoryService.getAllCategory().subscribe(
      result => {
        this.categoryList = result;
      },
      error => {
        console.log(error);

      }
    )
  }


  delete(category: any) {
    let index = this.categoryList.indexOf(category);
    this.categoryList.splice(index, 1);
    this.categoryService.deleteCategory(category._id).subscribe(
      res => {
        this.toastr.error(res.message);
        
      },
      err => {
        console.log(err);

      }
    )
  }

}



