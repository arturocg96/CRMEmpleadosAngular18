import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeViewComponent } from './pages/employee-view/employee-view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormComponent } from './pages/form/form.component';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'home' },
  { path: "home", component: HomeComponent },
  {
    path: "dashboard", component: DashboardComponent, canActivate: [loginGuard], children: [
      { path: "", pathMatch: 'full', redirectTo: 'empleados' },
      { path: "empleados", component: EmployeeListComponent },
      { path: "empleado/:id", component: EmployeeViewComponent },
      { path: "nuevo-empleado", component: FormComponent },
      { path: "actualizar-empleado/:id", component: FormComponent }
    ]
  },

  { path: "**", redirectTo: 'home' }
];
