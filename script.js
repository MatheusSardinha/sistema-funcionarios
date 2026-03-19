let currentId = 1;
const employees = [];

function addEmployee({ name, email, role, salary, hiredAt }) {
  const newEmployee = {
    id: currentId++,
    name,
    email,
    role,
    salary,
    hiredAt
  };

  employees.push(newEmployee);
  return newEmployee;
}

function listEmployees() {
  return employees;
}

function updateEmployee(id, updatedData) {
  const employee = employees.find(emp => emp.id === id);

  if (!employee) {
    console.log("Funcionário não encontrado");
    return null;
  }

  Object.assign(employee, updatedData);
  return employee;
}

function removeEmployee(id) {
  const index = employees.findIndex(emp => emp.id === id);

  if (index === -1) {
    console.log("Funcionário não encontrado");
    return false;
  }

  employees.splice(index, 1);
  return true;
}

function searchEmployeesByName(term) {
  return employees.filter(emp =>
    emp.name.toLowerCase().includes(term.toLowerCase())
  );
}