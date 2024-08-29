import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';
import { IEmployee } from '../../interfaces/iemployee.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  //inyeccion de dependencias
  employeesService = inject(EmployeesService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute)
  //tipados y propiedades de clase
  errorForm: any[] = [];
  tipo: string = 'Insertar';
  employeeForm: FormGroup;

  constructor() {
    this.employeeForm = new FormGroup({
      nombre: new FormControl(null, []),
      apellidos: new FormControl(null, []),
      email: new FormControl(null, []),
      telefono: new FormControl(null, []),
      salario: new FormControl(null, []),
      departamento: new FormControl(null, []),
    }, [])
  }

  ngOnInit() {
    //voy a preguntar por lo parametros ruta, si no tengo parametros estoy insertando y si tengo parametro estoy actualizando.
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        //Actualizado
        this.tipo = 'Actualizar'
        //pedimos por id los datos del empleado
        const employee: IEmployee = await this.employeesService.getById(params.id)
        //opcion 1 setValue pero los campos los campos tiene que ser exactamente los mismo
        //this.employeeForm.setValue(employee)

        //opcion 2 inicializando de nuevo los campos del formulario me permite por ejemplo poner otros validadores
        this.employeeForm = new FormGroup({
          _id: new FormControl(employee._id, []),
          nombre: new FormControl(employee.nombre, []),
          apellidos: new FormControl(employee.apellidos, []),
          email: new FormControl(employee.email, []),
          telefono: new FormControl(employee.telefono, []),
          salario: new FormControl(employee.salario, []),
          departamento: new FormControl(employee.departamento, []),
        }, [])

      }
    })
  }


  async getDataForm() {
    //si getDataForm trae id entonces actualizo y si no inserto
    if (this.employeeForm.value._id) {
      //Actualizando
      try {
        const response: IEmployee = await this.employeesService.update(this.employeeForm.value)
        if (response._id) {
          alert('Usuario actualizado');
          this.router.navigate(['/dashboard', 'empleados'])
        }
      } catch ({ error }: any) {
        this.errorForm = error
        console.log(this.errorForm)
      }

    } else {
      //insertando
      //peticion al servicio para insertar los datos en la API
      try {
        const response: IEmployee = await this.employeesService.insert(this.employeeForm.value)
        if (response._id) {
          this.router.navigate(['/dashboard', 'empleados'])
        }
      } catch ({ error }: any) {
        this.errorForm = error
        console.log(this.errorForm)
      }
    }


  }
}
