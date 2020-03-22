function solve() {
    let currentStop = 'depot';

    let infoSpan = document.querySelector('.info');
    let departBtn = document.querySelector('#depart');
    let arriveBtn = document.querySelector('#arrive');


    function depart() {
        let url = `https://softunixo2.firebaseio.com/schedule/${currentStop}.json`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const { name, next } = data;
                infoSpan.textContent = `Next stop ${name}`;
                departBtn.setAttribute('disabled', 'true');
                arriveBtn.removeAttribute('disabled');
            })
            .catch(err => {
                infoSpan.textContent = `Something went wrong!`;
                departBtn.setAttribute('disabled', 'true');
                arriveBtn.setAttribute('disabled', 'true');
            });
    }

    function arrive() {
        let url = `https://softunixo2.firebaseio.com/schedule/${currentStop}.json`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const { name, next } = data;
                infoSpan.textContent = `Arriving at ${name}`;
                arriveBtn.setAttribute('disabled', 'true');
                departBtn.removeAttribute('disabled');
                currentStop = next;
            })
            .catch(err => {
                infoSpan.textContent = `Something went wrong!`;
                departBtn.setAttribute('disabled', 'true');
                arriveBtn.setAttribute('disabled', 'true');
            });
    }

    return {
        depart,
        arrive
    };
}

let result = solve();