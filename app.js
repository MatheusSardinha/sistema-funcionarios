// ===== DOM =====
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("employee-name");
const emailInput = document.getElementById("employee-email");
const roleInput = document.getElementById("employee-role");
const salaryInput = document.getElementById("employee-salary");
const dateInput = document.getElementById("employee-date");
const tableBody = document.querySelector("#employee-table tbody");


// ===== Render =====
function renderEmployees() {
  tableBody.innerHTML = "";

  const employees = listEmployees();

  employees.forEach(emp => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.role}</td>
      <td>R$ ${Number(emp.salary).toFixed(2)}</td>
      <td>${emp.admission_date}</td>
      <td>
        <button>Editar</button>
        <button data-id="${emp.id}">Excluir</button>
      </td>
    `;

    const deleteBtn = tr.querySelector("[data-id]");
    deleteBtn.addEventListener("click", () => {
      removeEmployee(emp.id);
      renderEmployees();
    });

    tableBody.appendChild(tr);
  });
}


// ===== Enviar =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    alert("Preencha nome e email!");
    return;
  }

  addEmployee({
    name,
    email,
    role: roleInput.value,
    salary: salaryInput.value,
    admission_date: dateInput.value
  });

  form.reset();
  renderEmployees();
});


// ===== Iniciar =====
renderEmployees();