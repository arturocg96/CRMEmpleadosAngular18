import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //console.log('cargando interceptor')
  //logica del interceptor es la siguiente cogemos req que representa la cualquier peticion http y la clone
  const token = localStorage.getItem('token') || "";
  const cloneRequest = req.clone({
    setHeaders: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  })
  return next(cloneRequest);
};
