export interface Employee {
  id: string;
  name: string;
  cpf: string;
  birthDate: Date;
}

export interface CreateEmployeeDTO {
  name: string;
  cpf: string;
  birthDate: Date;
}

export interface UpdateEmployeeDTO {
  name?: string;
  cpf?: string;
  birthDate?: Date;
}
