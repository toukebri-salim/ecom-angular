import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../../../../services/category.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss']
})
export class CategoryUpdateComponent implements OnInit {
  updateCategoryForm: FormGroup


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private categoryService: CategoryService, private router: Router,private toastr: ToastrService) {
    let formControls = {
      name: new FormControl('',
        [Validators.required,
        Validators.pattern("[a-z . '-]+"),
        Validators.minLength(2)]
      ),


    }
    this.updateCategoryForm = this.fb.group(formControls)
  }
  get name() { return this.updateCategoryForm.get('name') }

  ngOnInit(): void {

    let idCategory = this.route.snapshot.params.id;
    this.categoryService.getOneCategory(idCategory).subscribe(
      res => {
        let category = res;
        this.updateCategoryForm.patchValue({
          name: category.name,
        

        })
       
      },
      err => {
        console.log(err);

      }
    )

  }


  updateCategory() {
    let data = this.updateCategoryForm.value;
    let idCategory = this.route.snapshot.params.id;

    this.categoryService.updateCategory(data, idCategory).subscribe(
      res => {
        this.toastr.warning(res.message);

        this.router.navigate(['/admin/category/list']);

      },
      err => {
        console.log(err);

      }
    )

  }

}