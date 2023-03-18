// Define the API endpoint
const API_URL = "http://localhost:3000/appointments";
const tableBody = document.getElementById("appointments-table-body");

document
  .getElementById("add-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const addData = {
      name: name,
      email: email,
      phone: phone,
    };

    try {
      const response = await axios.post(API_URL, addData);
      console.log("data is added...", response.data.id);
      const tr = document.createElement("tr");
      const appointment = response.data;
      // Add the appointment data to the row
      tr.innerHTML = `
        <td>${appointment.id}</td>
        <td>${appointment.name}</td>
        <td>${appointment.email}</td>
        <td>${appointment.phone}</td>
        <td>
          <button class="btn btn-primary btn-sm" id='${appointment.id}'>Update</button>
          <button class="btn btn-danger btn-sm" id='${appointment.id}'>Delete</button>
        </td>
      `;

      // Add the row to the table body
      tableBody.appendChild(tr);
    } catch (error) {
      console.log(error);
    }

    document.getElementById("add-form").reset();
  });

//  add list
function addList(id, name, email, phone) {
  const tr = document.createElement("tr");

  // Add the appointment data to the row
  tr.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>
          <button class="btn btn-primary btn-sm" id='${id}' >Update</button>
          <button class="btn btn-danger btn-sm" id='${id}' >Delete</button>
        </td>
      `;
  return tr;
}

function renderAppointments(appointments) {
  // Clear the table body
  tableBody.innerHTML = "";

  // Loop through the appointments and add rows to the table
  appointments.forEach((user) => {
    console.log(user.id, user.name, user.email, user.phone);
    const tr = addList(user.id, user.name, user.email, user.phone);
    // Add the row to the table body
    tableBody.appendChild(tr);
  });
}

// Function to get all appointments from the API and render them in the table
async function getAppointments() {
  try {
    const response = await axios.get(API_URL);
    renderAppointments(response.data);
  } catch (error) {
    console.log(error);
  }
}

getAppointments();
// Function to delete an appointment from the API and re-render the table

async function deleteAppointment(id) {
  try {
    const data = await axios.delete(`${API_URL}/${id}`);
    // getAppointments();

    console.log("deleted successfully....");
  } catch (error) {
    console.log(error);
  }
}

// edit function
function editFun(a, b, c, d) {
  const tr = document.createElement("tr");
  tr.innerHTML = ` <td>${a}</td>
    <td><input required type="text" value="${b}"/></td>
    <td><input required type="email" value="${c}"/></td>
    <td><input required type="tel" value="${d}"></td>
    <td>
      <button class="btn btn-primary btn-sm" id='${a}'>Save</button>
      <button class="btn btn-danger btn-sm" id='${a}'>Delete</button>
    </td>`;
  return tr;
}
// --------------button in action-------------------
tableBody.addEventListener("click", async (e) => {
  if (e.target.tagName === "BUTTON") {
    const btn = e.target;
    const tr = btn.parentNode.parentNode;
    if (btn.textContent === "Delete") {
      deleteAppointment(btn.id);
      tableBody.removeChild(tr);
    }

    if (btn.textContent === "Update") {
      const data = tr.children;
      let { a, b, c, d } = {
        a: data[0].textContent,
        b: data[1].textContent,
        c: data[2].textContent,
        d: data[3].textContent,
      };
      console.log(a, b, c, d);
      const row = editFun(a, b, c, d);
      tableBody.insertBefore(row, tr);
      tableBody.removeChild(tr);
    } else if (btn.textContent === "Save") {
      const data = tr.children;
      const a = data[0].textContent;
      const b = data[1].firstElementChild.value;
      const c = data[2].firstElementChild.value;
      const d = data[3].firstElementChild.value;
      console.log(a, b, c, d);
      if (a === "" || b === "" || c === "") {
        alert("This field is required ");
      } else {
        const userData = { name: b, email: c, phone: d };
        axios.put(`${API_URL}/${a}`, userData).then(() => {
          console.log("updated !!!");
          const row = addList(a, b, c, d);

          tableBody.insertBefore(row, tr);
          tableBody.removeChild(tr);
        });
      }
    }
  }
});
