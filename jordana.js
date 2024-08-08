document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');
    const searchInput = document.getElementById('search');
    const contactIdInput = document.getElementById('contactId');
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    contactForm.addEventListener('submit', saveContact);
    searchInput.addEventListener('input', searchContacts);

    function saveContact(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const contactId = contactIdInput.value;

        if (contactId) {
            const index = contacts.findIndex(contact => contact.id == contactId);
            contacts[index] = { id: contactId, name, phone, email };
        } else {
            const id = Date.now();
            contacts.push({ id, name, phone, email });
        }

        localStorage.setItem('contacts', JSON.stringify(contacts));
        contactForm.reset();
        contactIdInput.value = '';
        displayContacts();
    }

    function editContact(id) {
        const contact = contacts.find(contact => contact.id == id);
        document.getElementById('name').value = contact.name;
        document.getElementById('phone').value = contact.phone;
        document.getElementById('email').value = contact.email;
        contactIdInput.value = contact.id;
    }

    function deleteContact(id) {
        contacts = contacts.filter(contact => contact.id != id);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        displayContacts();
    }

    function searchContacts() {
        const query = searchInput.value.toLowerCase();
        const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(query));
        displayContacts(filteredContacts);
    }

    function displayContacts(filteredContacts = contacts) {
        contactList.innerHTML = '';
        filteredContacts.forEach(contact => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${contact.name} - ${contact.phone} - ${contact.email}</span>
                <button onclick="editContact(${contact.id})">Edit</button>
                <button onclick="deleteContact(${contact.id})">Delete</button>
            `;
            contactList.appendChild(li);
        });
    }

    window.editContact = editContact;
    window.deleteContact = deleteContact;
    displayContacts();
});
