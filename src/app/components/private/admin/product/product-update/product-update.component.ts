import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { ProductService } from './../../../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../../../../services/category.service'
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  categoryList: any[] = []

  updateProductForm: FormGroup
  public imageUrl: String = "./../../../../../../assets/image/2k.jpg"

  public imageFile!: File

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private route: ActivatedRoute, private productService: ProductService, private router: Router, private toastr: ToastrService) {
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
    this.updateProductForm = this.fb.group(formControls)
  }
  get name() { return this.updateProductForm.get('name') }
  get description() { return this.updateProductForm.get('description') }
  get price() { return this.updateProductForm.get('price') }
  get image() { return this.updateProductForm.get('image') }
  get categoryId() { return this.updateProductForm.get('categoryId') }

  ngOnInit(): void {
    let idProduct = this.route.snapshot.params.id;
    this.productService.getOneProduct(idProduct).subscribe(
      res => {

        let product = res;
        this.updateProductForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          categoryId: product.categoryId


        })
this.imageUrl = "http://localhost:3000/"+res.image

      },
      err => {
        console.log(err);

      }
    )


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
    let reader = new FileReader //deux classe fi typeScript t5alinia na9ra fiche
    reader.readAsDataURL(event.target.files[0])
    reader.onload = (event) => this.imageUrl = event.target?.result?.toString()!
    this.imageFile = (event).target.files[0]
  }


  updateProduct() {
    let data = this.updateProductForm.value;
    let idProduct = this.route.snapshot.params.id;
    const formData = new FormData()

    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("categoryId", data.categoryId)
    formData.append("image", this.imageFile)


    this.productService.updateProduct(formData, idProduct).subscribe(
      res => {
console.log(res);

        this.router.navigate(['/admin/product/list']);
        this.toastr.warning(res.message);

      },
      err => {
        console.log(err);
      
      }

      /*
  updateProduct() {
    let data = this.updateProductForm.value
    let idProduct = this.rout.snapshot.params.id;
    const formData = new FormData()


    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("categoryId", data.categoryId)
    formData.append("image", this.imageFile)

    this.productService.updateProduct(formData,idProduct).subscribe(
      res => {
        this.toastr.success(res.message);

        this.router.navigate(['/admin/product/list']);
      },
      err => {
        console.log(err);

      }
    )



  }

      */
    )

  }

}