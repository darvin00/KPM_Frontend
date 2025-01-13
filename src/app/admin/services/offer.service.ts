import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private baseUrl = 'https://kpm.thikse.in:8080/api/offers'; // Adjust URL

  constructor(private http: HttpClient) {}

  sendOffer(customerId: number, offerMessage: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/send`, {
      customerId,
      offerMessage,
    });
  }
}
