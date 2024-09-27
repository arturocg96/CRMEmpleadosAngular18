import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';

type response = {
  success: string;
  token: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  usersService = inject(UsersService)
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  error: boolean = false;
  msg: string = "";

  ngOnInit() {
    //comprobamos le queryparams
    this.activatedRoute.queryParams.subscribe((queryParams: any) => {
      if (queryParams.status === '1') {
        this.error = true;
        this.msg = "No tienes permisos para acceder aqui, logeate"
      } else if (queryParams.status === '2') {
        this.error = true;
        this.msg = "Hasta pronto"
      }
    })
  }

  // constructor(private usersService:UsersService){}

  async getLoginData(formValue: IUser, form: any) {
    try {
      let response: response = await this.usersService.login(formValue);
      //cuando tenemos el login correcto tenemos que almacenar el token en el localstorage y redirigiremos a la pagina de dashboard
      // guardar dato en localStorage.setItem('nombre', JSON.stringify([valor])) ,
      // obtener el dato en localStorage.getItem('nombre'), si lo tuviese que convertir en array JSON.parse(localstorage.getItem('nombre))
      //borrar un campo concreto del localStorage.removeItem('nombre')
      //vaciar todo el localStorage.clear()
      localStorage.setItem('token', response.token);
      this.router.navigate(['/dashboard'])
    } catch (er: any) {
      this.error = true;
      this.msg = er.error.error
      form.reset()
    }

  }
}
