import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IEmployee } from '../interfaces/iemployee.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private baseUrl: string = "https://crm-empleados.onrender.com/api/empleados/"
  private http = inject(HttpClient);

  /**
   * GETALL()
   * return Promise<IEmployee[]>
   */
  getAll(): Promise<IEmployee[]> {
    return firstValueFrom(this.http.get<IEmployee[]>(this.baseUrl))
  }

  /**
   * GETBYID(id:string)
   * return Promise<IEmployee>
 */
  getById(id: string): Promise<IEmployee> {
    return firstValueFrom(this.http.get<IEmployee>(`${this.baseUrl}${id}`))
  }

  /**
  * DELETE(id:string)
  * return Promise<IEmployee>
*/
  delete(id: string): Promise<IEmployee> {
    return firstValueFrom(this.http.delete<IEmployee>(`${this.baseUrl}${id}`))
  }

  /**
  * INSERT(body:IEmployee)
  * return Promise<IEmployee>
*/
  insert(body: IEmployee): Promise<IEmployee> {
    return firstValueFrom(this.http.post<IEmployee>(this.baseUrl, body))
  }

  /**
  * UPDATE(body:IEmployee)
  * return Promise<IEmployee>
*/
  update(body: IEmployee): Promise<IEmployee> {
    //esta Api no necesito enviar el id de usario solo pasarlo por parametro, si lo envio me da un error asi que elimino.
    let id = body._id;
    //esto sirve para eliminar de un objeto una clave con su valor
    delete body._id;
    return firstValueFrom(this.http.put<IEmployee>(`${this.baseUrl}${id}`, body))
  }


}
