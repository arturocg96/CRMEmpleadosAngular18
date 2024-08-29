export interface IEmployee {
  _id?: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  departamento: string;
  salario: number;
  createdAt?: Date;
  updatedAt?: Date;
}
