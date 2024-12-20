
let appointments = [];

document.getElementById('donation-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const tipoSanguineo = document.getElementById('tipoSanguineo').value;
    const sexo = document.getElementById('sexo').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const centroDoacao = document.getElementById('centroDoacao').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;
    const editIndex = document.getElementById('edit-index').value;

    if (editIndex === "") {
        appointments.push({
            nome,
            sobrenome,
            tipoSanguineo,
            sexo,
            endereco,
            telefone,
            email,
            centroDoacao,
            data,
            horario
        });
    } else {
        appointments[editIndex] = {
            nome,
            sobrenome,
            tipoSanguineo,
            sexo,
            endereco,
            telefone,
            email,
            centroDoacao,
            data,
            horario
        };
        document.getElementById('edit-index').value = "";
    }

    document.getElementById('success-message').style.display = 'block';
    renderAppointments();
    document.getElementById('donation-form').reset();
});

function renderAppointments() {
    const appointmentsList = document.getElementById('appointments');
    appointmentsList.innerHTML = '';

    appointments.forEach((appointment, index) => {
        const appointmentItem = document.createElement('li');
        appointmentItem.innerHTML = `
            Nome: ${appointment.nome} ${appointment.sobrenome}, Tipo Sanguíneo: ${appointment.tipoSanguineo}, Centro: ${appointment.centroDoacao}, Data: ${appointment.data}, Horário: ${appointment.horario}
            <button onclick="editAppointment(${index})">Reagendar</button>
            <button onclick="cancelAppointment(${index})">Cancelar</button>
        `;
        appointmentsList.appendChild(appointmentItem);
    });
}

function cancelAppointment(index) {
    appointments.splice(index, 1);
    renderAppointments();
    alert("Agendamento cancelado com sucesso!");
}

function editAppointment(index) {
    const appointment = appointments[index];
    document.getElementById('nome').value = appointment.nome;
    document.getElementById('sobrenome').value = appointment.sobrenome;
    document.getElementById('tipoSanguineo').value = appointment.tipoSanguineo;
    document.getElementById('sexo').value = appointment.sexo;
    document.getElementById('endereco').value = appointment.endereco;
    document.getElementById('telefone').value = appointment.telefone;
    document.getElementById('email').value = appointment.email;
    document.getElementById('centroDoacao').value = appointment.centroDoacao;
    document.getElementById('data').value = appointment.data;
    document.getElementById('horario').value = appointment.horario;
    document.getElementById('edit-index').value = index;
}