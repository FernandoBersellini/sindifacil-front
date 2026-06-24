# Sindifacil
  This app is a ERP system for small businesses in Brazil.
  It has a frontend and a backend.  
  Frontend is made with Next.js + TypeScript.  
  Backend is made with NestJS + PostgreSQL + TypeScript + Typeorm.

  This repo is only the frontend.
  The backend is in the repository: https://github.com/FernandoBersellini/sindifacil-back


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
```

# Frontend
 - Next.js + TypeScript

### Frontend URLs
- Base url: http://localhost:3002

# General
- App language: Portuguese - Brazil
- Date format: DD/MM/YYYY
- CPF format: 000.000.000-00

## Database

### Table: employees

Columns:
 - id: uuid (primary key)
 - name: varchar
 - cpf: varchar
 - birthDate: date

