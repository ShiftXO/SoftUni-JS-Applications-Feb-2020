function getInfo() {
    let stopId = document.querySelector('#stopId');
    let stopNameDiv = document.querySelector('#stopName');
    let busesUl = document.querySelector('#buses');

    let url = `https://softunixo.firebaseio.com/businfo/${stopId.value}.json`;

    stopNameDiv.textContent = '';
    busesUl.textContent = '';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const { buses, name } = data;
            stopNameDiv.textContent = name;

            Object.entries(buses)
                .forEach(([id, time]) => {
                    let li = document.createElement('li');
                    li.textContent = `Bus ${id} arrives in ${time} minutes.`;

                    busesUl.appendChild(li);
                });

        })
        .catch((er) => {
            stopNameDiv.textContent = 'Error';
        });
}