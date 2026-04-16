// DOM
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("employee-name");
const emailInput = document.getElementById("employee-email");
const roleInput = document.getElementById("employee-role");
const salaryInput = document.getElementById("employee-salary");
const dateInput = document.getElementById("employee-date");
const tableBody = document.querySelector("#employee-table tbody");
const editModeText = document.getElementById("edit-mode");

let editingId = null;

// Render
function renderEmployees() {
  tableBody.innerHTML = "";

  const employeesList = listEmployees();

  employeesList.forEach(emp => {
    const tr = document.createElement("tr");

    const formattedSalary = Number(emp.salary).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    const formattedDate = new Date(emp.admission_date).toLocaleDateString("pt-BR");

    tr.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.role}</td>
      <td>${formattedSalary}</td>
      <td>${formattedDate}</td>
      <td>
        <button type="button" data-edit="${emp.id}">Editar</button>
        <button type="button" data-id="${emp.id}">Excluir</button>
      </td>
    `;

    // Remove
    tr.querySelector("[data-id]").addEventListener("click", () => {
      removeEmployee(emp.id);
      renderEmployees();
    });

    // Edit
    tr.querySelector("[data-edit]").addEventListener("click", () => {
      editingId = emp.id;

      nameInput.value = emp.name;
      emailInput.value = emp.email;
      roleInput.value = emp.role;
      salaryInput.value = emp.salary;
      dateInput.value = emp.admission_date;

      form.querySelector("button").textContent = "Salvar Alterações";
      editModeText.textContent = "Editando funcionário...";

      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    tableBody.appendChild(tr);
  });
}

// Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    alert("Preencha nome e email!");
    return;
  }

  const employeeData = {
    name,
    email,
    role: roleInput.value,
    salary: salaryInput.value,
    admission_date: dateInput.value
  };

  if (editingId !== null) {
    updateEmployee(editingId, employeeData);
    editingId = null;

    form.querySelector("button").textContent = "Salvar Funcionário";
    editModeText.textContent = "";
  } else {
    addEmployee(employeeData);
  }

  form.reset();
  roleInput.selectedIndex = 0;

  renderEmployees();
});

// Init
renderEmployees();