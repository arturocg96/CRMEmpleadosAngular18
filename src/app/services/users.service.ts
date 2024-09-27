import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { firstValueFrom } from 'rxjs';
type response = {
  success: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = "https://crm-empleados.onrender.com/api/usuarios/"
  private http = inject(HttpClient);

  login(user: IUser): Promise<response> {
    //esto eliminaremos cuando creemos el interceptor
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json"
    //   })
    // }
    return firstValueFrom(this.http.post<response>(`${this.baseUrl}login`, user))
  }
}
