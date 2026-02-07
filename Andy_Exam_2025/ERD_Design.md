# Entity Relationship Diagram (ERD) Design
## Employee Payroll Management System (EPMS)

### Entities and Relationships

#### 1. Department Entity
- **Primary Key**: DepartmentCode
- **Attributes**:
  - DepartmentCode (PK) - VARCHAR(10)
  - DepartmentName - VARCHAR(100)
  - GrossSalary - DECIMAL(10,2)
  - TotalDeduction - DECIMAL(10,2)

#### 2. Employee Entity
- **Primary Key**: employeeNumber
- **Foreign Key**: DepartmentCode (references Department.DepartmentCode)
- **Attributes**:
  - employeeNumber (PK) - VARCHAR(20)
  - FirstName - VARCHAR(50)
  - LastName - VARCHAR(50)
  - Position - VARCHAR(100)
  - Address - TEXT
  - Telephone - VARCHAR(20)
  - Gender - VARCHAR(10)
  - hiredDate - DATE
  - DepartmentCode (FK) - VARCHAR(10)

#### 3. Salary Entity
- **Primary Key**: id (auto-increment)
- **Foreign Key**: employeeNumber (references Employee.employeeNumber)
- **Attributes**:
  - id (PK) - INT AUTO_INCREMENT
  - GrossSalary - DECIMAL(10,2)
  - TotalDeduction - DECIMAL(10,2)
  - NetSalary - DECIMAL(10,2)
  - month - VARCHAR(20)
  - employeeNumber (FK) - VARCHAR(20)

### Relationships

#### 1. Department - Employee Relationship
- **Type**: One-to-Many (1:N)
- **Description**: One department can have many employees, but each employee belongs to exactly one department
- **Cardinality**: Department (1) ←→ Employee (N)
- **Implementation**: DepartmentCode as foreign key in Employee table

#### 2. Employee - Salary Relationship
- **Type**: One-to-Many (1:N)
- **Description**: One employee can have many salary records (one for each month), but each salary record belongs to exactly one employee
- **Cardinality**: Employee (1) ←→ Salary (N)
- **Implementation**: employeeNumber as foreign key in Salary table

### ERD Diagram (Text Representation)

```
┌─────────────────────┐         ┌─────────────────────┐         ┌─────────────────────┐
│     Department      │         │      Employee       │         │       Salary        │
├─────────────────────┤         ├─────────────────────┤         ├─────────────────────┤
│ DepartmentCode (PK) │◄────────┤ employeeNumber (PK) │◄────────┤        id (PK)       │
│ DepartmentName      │         │ FirstName           │         │ GrossSalary         │
│ GrossSalary         │         │ LastName            │         │ TotalDeduction      │
│ TotalDeduction      │         │ Position            │         │ NetSalary           │
└─────────────────────┘         │ Address             │         │ month               │
                                │ Telephone           │         │ employeeNumber (FK) │
                                │ Gender              │         └─────────────────────┘
                                │ hiredDate           │
                                │ DepartmentCode (FK) │
                                └─────────────────────┘
```

### Key Design Decisions

1. **Surrogate Key for Salary**: Added auto-increment `id` as primary key for Salary table to handle multiple salary records per employee over time.

2. **Referential Integrity**: 
   - Employee.DepartmentCode references Department.DepartmentCode
   - Salary.employeeNumber references Employee.employeeNumber

3. **Data Types**:
   - VARCHAR for textual data with appropriate lengths
   - DECIMAL(10,2) for monetary values to handle RWF currency
   - DATE for hire dates
   - AUTO_INCREMENT for Salary primary key

4. **Normalization**: The design follows 3NF with:
   - No repeating groups
   - All attributes depend on the entire primary key
   - No transitive dependencies

### Initial Data Population

The Department table will be pre-populated with:
- CW (Carwash) - 300,000 RWF gross, 20,000 RWF deduction
- ST (Stock) - 200,000 RWF gross, 5,000 RWF deduction  
- MC (Mechanic) - 450,000 RWF gross, 40,000 RWF deduction
- ADMS (Administration Staff) - 600,000 RWF gross, 70,000 RWF deduction

This ERD design ensures data integrity, supports all required CRUD operations, and enables efficient generation of monthly payroll reports.
