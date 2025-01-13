import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerBehaviorService {
  private baseUrl = 'https://kpm.thikse.in:8080/api/analytics/customer-behavior';

  constructor(private http: HttpClient) {}

  getCustomerBehavior(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${customerId}`);
  }
}
