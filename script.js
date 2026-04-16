const employees = [];

let currentId = employees.length > 0 
  ? Math.max(...employees.map(e => e.id)) + 1 
  : 1;

function addEmployee({ name, email, role, salary, admission_date }) {
  const newEmployee = {
    id: currentId++,
    name,
    email,
    role,
    salary,
    admission_date
  };

  employees.push(newEmployee);
  return newEmployee;
}

function listEmployees() {
  return employees;
}

function updateEmployee(id, updatedData) {
  const employee = employees.find(emp => emp.id === id);

  if (!employee) return null;

  Object.assign(employee, updatedData);
  return employee;
}

function removeEmployee(id) {
  const index = employees.findIndex(emp => emp.id === id);

  if (index === -1) return false;

  employees.splice(index, 1);
  return true;
}

function searchEmployeesByName(term) {
  return employees.filter(emp =>
    emp.name.toLowerCase().includes(term.toLowerCase())
  );
}