const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function renderContacts() {
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>Nome:</strong> ${contact.name}</span> 
            <span><strong>Telefone:</strong> ${contact.phone}</span>
            <span><strong>Email:</strong> ${contact.email}</span>
            <button onclick="editContact(${index})">Editar</button>
            <button onclick="deleteContact(${index})">Excluir</button>
        `;
        contactList.appendChild(li);
    });
}

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const newContact = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    };

    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));

    renderContacts();
    contactForm.reset();
});

function editContact(index) {
    const contact = contacts[index];

    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email;

    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    renderContacts();
}

function deleteContact(index) {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    renderContacts();
}

document.addEventListener('DOMContentLoaded', renderContacts);
