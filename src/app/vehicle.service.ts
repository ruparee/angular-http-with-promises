import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export class Vehicle {
  constructor(public id: number, public name: string) {}
}

@Injectable()
export class VehicleService {

  constructor(private http: HttpClient) {

  }
  getVehicles(value?: string) {
    return this.http
      .get('assets/vehicles.json')
      .pipe(
        map((data: any) => <Vehicle[]> data.data),
        tap(data => console.log(data)),
        catchError(this.handleError)
      )
      .toPromise();
  }

  private handleError(res: HttpErrorResponse) {
    console.error(res.error);
    return throwError(res.error || 'Server error');
  }
}
