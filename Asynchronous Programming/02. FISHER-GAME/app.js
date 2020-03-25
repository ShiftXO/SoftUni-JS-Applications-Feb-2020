(() => {
    let elements = {
        addBtn: document.querySelector('button.add'),
        baitInput: document.querySelector('input.bait'),
        weightInput: document.querySelector('input.weight'),
        anglerInput: document.querySelector('input.angler'),
        speciesInput: document.querySelector('input.species'),
        locationInput: document.querySelector('input.location'),
        captureTimeInput: document.querySelector('input.captureTime'),
        loadBtn: document.querySelector('.load'),
    };

    let CREATE_URL = "https://fisher-game.firebaseio.com/catches.json";
    let DELETE_URL = "https://fisher-game.firebaseio.com/catches/{catchId}.json";

    elements.addBtn.addEventListener('click', addCatch);
    elements.loadBtn.addEventListener('click', loadCatches);


    function addCatch() {
        let myCatch = {
            bait: elements.baitInput.value,
            weight: elements.weightInput.value,
            angler: elements.anglerInput.value,
            species: elements.speciesInput.value,
            location: elements.locationInput.value,
            captureTime: elements.captureTimeInput.value,
        };

        let headers = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(myCatch)
        };

        fetch(CREATE_URL, headers)
            .then(data => {
                console.log(data);
            }).catch(e => {
                console.error(e);
            })
    }

    function deleteCatch() {
        let catchId = "-M2Z49JNGqAQgeLOXlSA";
        let url = DELETE_URL.replace('{catchId}', catchId);

        let headers = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(url, headers)
            .then(data => { data.json() })
            .catch(e => { console.error(e) })

    }

    function loadCatches() {
        fetch(CREATE_URL)
            .then(res => res.json())
            .then(data => { console.log(data) })
    }

})();