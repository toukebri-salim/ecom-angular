import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { CategoryService } from './../../../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category-one',
  templateUrl: './category-one.component.html',
  styleUrls: ['./category-one.component.scss']
})
export class CategoryOneComponent implements OnInit {
  categoryList: any

  constructor(private route :ActivatedRoute, private categoryService: CategoryService,private toastr: ToastrService) { }

  ngOnInit(): void {

    let idCategory = this.route.snapshot.params.id;

    this.categoryService.getOneCategory(idCategory).subscribe(
      result => {
        this.categoryList = result;
        
      },
      error => {
        console.log(error);

      }
    )
  }

}
