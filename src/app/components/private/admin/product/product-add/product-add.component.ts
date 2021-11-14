import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { ProductService } from './../../../../../services/product.service';
import { CategoryService } from './../../../../../services/category.service'
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  public categoryList: any[] = []
  public addProductForm: FormGroup
  public imageUrl: String = "./../../../../../../assets/image/700x400.png"

  // "!"  variable image file bch naatiwha valeur  khater maandheech valeur initial  
  public imageFile!: File

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private productService: ProductService, private router: Router, private toastr: ToastrService) {
    let formControls = {
      name: new FormControl('',
        [Validators.required,
        Validators.pattern("[a-z . '-]+"),
        Validators.minLength(2)]
      ),
      description: new FormControl('',
        [Validators.required,
        Validators.pattern("[a-z . '-]+"),
        ]),
      price: new FormControl('',
        [Validators.required,
        Validators.pattern("[0-9]+"),
        ]),
      image: new FormControl('',
        [Validators.required,
        ]),
      categoryId: new FormControl('',
        [Validators.required,
        ]),
    }
    this.addProductForm = this.fb.group(formControls)
  }
  get name() { return this.addProductForm.get('name') }
  get description() { return this.addProductForm.get('description') }
  get price() { return this.addProductForm.get('price') }
  get image() { return this.addProductForm.get('image') }
  get categoryId() { return this.addProductForm.get('categoryId') }
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
  onFileSelect(event: any) {
    let reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = (event) => this.imageUrl = event.target?.result?.toString()!
    this.imageFile=event.target.files[0]
  }

  productAdd() {
    let data = this.addProductForm.value;
    const formData=new FormData()


    formData.append("name", data.name )
    formData.append("description", data.description )
    formData.append("price", data.price )
    formData.append("categoryId", data.categoryId )
    formData.append("image",this.imageFile)

    this.productService.addProduct(formData).subscribe(
      res => {
        this.toastr.success(res.message);

        this.router.navigate(['/admin/product/list']);
      },
      err => {
        this.toastr.success(err.message);

      }
    )
  }

}


