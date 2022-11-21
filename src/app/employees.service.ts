import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private _httpClient: HttpClient) {}

  getEmployees(): Observable<any> {
    return this._httpClient.get(
      'https://employees-db.onrender.com/api/v1/employee'
    );
  }

  addEmployee(employee: any): Observable<any> {
    return this._httpClient.post(
      'https://employees-db.onrender.com/api/v1/employee/add',
      employee
    );
  }

  deleteEmployee(id: string): Observable<any> {
    return this._httpClient.delete(
      `https://employees-db.onrender.com/api/v1/employee/delete/${id}`
    );
  }
}
