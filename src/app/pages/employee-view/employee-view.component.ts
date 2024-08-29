import { Component, inject } from '@angular/core';
import { IEmployee } from '../../interfaces/iemployee.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.css'
})
export class EmployeeViewComponent {
  employee: IEmployee | null = null
  activatedRoute = inject(ActivatedRoute);
  employeesService = inject(EmployeesService)

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.id
      this.employee = await this.employeesService.getById(id);
    })
  }


}
