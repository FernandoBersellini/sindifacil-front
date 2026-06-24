# Backend 
 - NestJS + PostgreSQL + TypeScript + Typeorm

### Backend URLs
- Base url: http://localhost:3001/api/v1

#### Employees
- Create: POST http://localhost:3001/api/v1/employees/create
- List: GET http://localhost:3001/api/v1/employees/list
- Detail: GET http://localhost:3001/api/v1/employees/detail/:id
- Update: PATCH http://localhost:3001/api/v1/employees/update/:id
- Remove: DELETE http://localhost:3001/api/v1/employees/remove/:id

### DTOs

#### CreateEmployeeDTO
```ts
export interface CreateEmployeeDTO {
  name: string;
  cpf: string;
  birthDate: Date;
}
```

#### UpdateEmployeeDTO
```ts
export interface UpdateEmployeeDTO {
  name?: string;
  cpf?: string;
  birthDate?: Date;
}