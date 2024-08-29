import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IEmployee } from '../../interfaces/iemployee.interface';
import { EmployeesService } from '../../services/employees.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  // nos traemos los datos de la api.
  arrEmployees: IEmployee[] = [];
  employeesService = inject(EmployeesService)

  async ngOnInit() {
    try {
      const response = await this.employeesService.getAll()
      this.arrEmployees = response;

    } catch (error) {
      console.log(error)
    }
  }

  async delete(id: string | undefined) {
    if (id) {
      let borrado = confirm('Deseas Borrar el empleado cuyo id es: ' + id)
      if (borrado) {
        //llamo al servicio y hago el borrado
        try {
          const response: IEmployee = await this.employeesService.delete(id);
          if (response._id) {
            const response = await this.employeesService.getAll()
            this.arrEmployees = response;
            alert('Empleado borrado correctamente')
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

  }

}
