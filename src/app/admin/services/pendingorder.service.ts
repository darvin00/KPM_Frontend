import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PendingOrderService {
  private baseUrl = 'https://kpm.thikse.in:8080/api/analytics/pending-orders';

  constructor(private http: HttpClient) {}

  getPendingOrder(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${orderId}`);
  }
}
