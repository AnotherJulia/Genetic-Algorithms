
function graphPop() {
    
    const data = fetchData();

    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new myChart(ctx, {
        type:'line',
        data: {
            labels: data.xs, 
            datasets: [{
                label: "Population each generation",
                data: data.ys,
                fill: true,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1
            }]
        }
    })

}

function fetchData() {
    const xs = [];
    const ys = [];
    let data;
    
    fetch('population.csv').then(response => {
        console.log(response);
    })

    console.log(data);

    const table = data.split('\n').splice(1);
    
    table.forEach(row => {
        const cols = row.split(',');
        const generation = cols[0];

        xs.push(generation);
        const population = cols[1];
        ys.push(population)

        console.log(generation, population);
    })
    return {xs, ys}
}


function fetch_() {
    fetch('population.csv').then(response => {
        return response.text(). then(response => {
            data = response;
        })
    })
}