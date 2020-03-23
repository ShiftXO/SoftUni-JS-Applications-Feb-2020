function attachEvents() {
    let personInput = document.querySelector('#person');
    let phoneInput = document.querySelector('#phone');
    let phonebookUl = document.querySelector('#phonebook');

    let url = `https://softunixo3.firebaseio.com/phonebook.json`;

    function loadPhonebook() {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);

                Object.entries(data)
                    .forEach(([elId, phoneData]) => {
                        if (elId && phoneData) {
                            const { phone, person } = phoneData;
                            let li = document.createElement('li');
                            li.textContent = `${person}: ${phone}`;

                            let deleteBtn = document.createElement('button');
                            deleteBtn.textContent = 'Delete';
                            deleteBtn.setAttribute('data-target', elId);
                            deleteBtn.addEventListener('click', deletePhonebook);

                            li.appendChild(deleteBtn);
                            phonebookUl.appendChild(li);
                        }
                    })
            })
            .catch(handleError);
    }

    function createPhonebook(e) {
        let person = personInput.value;
        let phone = phoneInput.value;

        let headers = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ person, phone })
        };

        fetch('https://softunixo3.firebaseio.com/phonebook.json', headers)
            .then(() => {
                personInput.value = '';
                phoneInput.value = '';
                phonebookUl.innerHTML = '';

                loadPhonebook();
            })
            .catch(handleError);

    }

    function deletePhonebook() {
        let phoneId = this.getAttribute('data-target');

        let headers = {
            method: 'DELETE'
        }

        fetch(`https://softunixo3.firebaseio.com/phonebook/${phoneId}.json`, headers)
            .then(() => {
                phonebookUl.innerHTML = '';
                loadPhonebook();
            })
            .catch(handleError);
    }

    function handleError(error) {
        console.log(error);
    }

    return {
        loadPhonebook,
        createPhonebook
    }
}

let res = attachEvents();