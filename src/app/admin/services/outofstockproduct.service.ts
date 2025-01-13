import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OutOfStockProductService {
  private baseUrl =
    'https://kpm.thikse.in:8080/api/analytics/out-of-stock-products';

  constructor(private http: HttpClient) {}

  getOutOfStockProduct(productId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${productId}`);
  }
}
