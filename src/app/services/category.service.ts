import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private addCategoryUrl = "http://localhost:3000/category/add"
  private updateCategoryUrl = "http://localhost:3000/category/update-info/"
  private getAllCategoryUrl = "http://localhost:3000/category/all"
  private deleteCategoryUrl = "http://localhost:3000/category/delete/"
  private getOneCategoryUrl = "http://localhost:3000/category/one/"




  constructor(private http: HttpClient) { }
  addCategory(category: any) {
    return this.http.post<any>(this.addCategoryUrl, category)
  }
  getOneCategory(id: String) {
    return this.http.get<any>(this.getOneCategoryUrl + id)
  }
  updateCategory(category: any, id: String) {
    return this.http.put<any>(this.updateCategoryUrl + id, category)
  }
  getAllCategory() {
    let data = this.http.get<any>(this.getAllCategoryUrl);
    return data;
  }
  deleteCategory(id: String) {
    return this.http.delete<any>(this.deleteCategoryUrl + id)
  }

}




