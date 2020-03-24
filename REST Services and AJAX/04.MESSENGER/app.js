function attachEvents() {
    let author = document.querySelector('#author');
    let content = document.querySelector('#content');
    let messages = document.querySelector('#messages');

    let url = `https://softunixo4.firebaseio.com/messenger.json`;

    function sendMS() {
        if (!author.value || !content.value) {
            throw new Error('Please check your input!')
        }

        let input = {
            author: author.value,
            content: content.value
        }

        let headers = {
            method: 'POST',
            headers: { 'Content-Type': 'application/js' },
            body: JSON.stringify(input)
        }

        fetch(url, headers)
            .then(refreshMS)
            .then(() => {
                author.value = '';
                content.value = '';
            })
            .catch(handleError);
    }

    function refreshMS() {
        fetch(url)
            .then(x => x.json())
            .then(data => {
                messages.textContent = '';
                for (const key in data) {
                    if (data[key]['author'] || data[key]['content']) {
                        messages.textContent += `${data[key]['author']}: ${data[key]['content']}\n`;
                    }
                }
            })
            .catch(handleError);
    }

    function handleError(error) {
        console.log(error);
    }

    return {
        sendMS,
        refreshMS
    }
}

let result = attachEvents();