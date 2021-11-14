import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private addProductUrl = "http://localhost:3000/product/add"
  private getoneProductUrl = "http://localhost:3000/product/one/"
  private updateProductUrl = "http://localhost:3000/product/update-info/"
  private getAllProductUrl = "http://localhost:3000/product/all"
  private deleteProductUrl = "http://localhost:3000/product/delete/"



  constructor(private http: HttpClient) { }
  addProduct(product: any) {
    return this.http.post<any>(this.addProductUrl, product)
  }

  getOneProduct(id: String) {
    return this.http.get<any>(this.getoneProductUrl + id)
  }
  updateProduct(product: any, id: String) {
    return this.http.patch<any>(this.updateProductUrl + id, product)
  }
  getAllProduct() {
    let data = this.http.get<any>(this.getAllProductUrl);
    return data;
  }
  deleteProduct(id: String) {
    return this.http.delete<any>(this.deleteProductUrl + id)
  }

}


