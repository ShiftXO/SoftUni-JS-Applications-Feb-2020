function solve(car) {
    let map = [90, 120, 200];

    let engines = {
        90: 1800,
        120: 2400,
        200: 3500
    }

    let n = map.sort((a, b) => Math.abs(car.power - a) - Math.abs(car.power - b))[0]

    let size = car.wheelsize % 2 !== 0 ? car.wheelsize : 2 * Math.floor(car.wheelsize / 2) - 1;

    let newCar = {
        model: car.model,
        engine: {
            power: n,
            volume: engines[n]
        },
        carriage: {
            type: car.carriage,
            color: car.color
        },
        wheels: [size, size, size, size]
    }

    return newCar;
}

solve(
    {
        model: 'VW Golf II',
        power: 90,
        color: 'blue',
        carriage: 'hatchback',
        wheelsize: 14
    }
)

solve(
    {
        model: 'Opel Vectra',
        power: 110,
        color: 'grey',
        carriage: 'coupe',
        wheelsize: 17
    }
)