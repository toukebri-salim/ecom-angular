import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { CategoryService } from './../../../../../services/category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  addCategoryForm: FormGroup


  constructor(private fb: FormBuilder, private categoryService:CategoryService,  private router: Router, private toastr: ToastrService) {
    let formControls = {
      name: new FormControl('',
        [Validators.required,
        Validators.pattern("[a-z . '-]+"),
        Validators.minLength(2)] 
      ),
     
     
    }
    this.addCategoryForm = this.fb.group(formControls)
    
  }
  get name() { return this.addCategoryForm.get('name') }

  ngOnInit(): void {
  }


  categoryAdd() {
    let data = this.addCategoryForm.value;
    this.categoryService.addCategory(data).subscribe(
      res=>{
        this.toastr.success(res.message);

        this.router.navigate(['/admin/category/list']);
      },
      err=>{
    console.log(err);
    
      }
    ) 
      }
    
    }
    
  
