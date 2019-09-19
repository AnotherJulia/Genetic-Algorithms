var data = [];

function configureData() {
    AverageSpeed();
    AverageSize();
    AverageSense();

    var addedData = [gen, dots.length, AVG_speed, AVG_size, AVG_sense];
    if (debugmode) {
        console.log(addedData);

    }
    data.push(addedData);
}

function download_csv() {
    var csv = 'Generation, Population, AVG_speed, AVG_size, AVG_sense \n';
    data.forEach(function(row) {
        csv += row.join(',');
        csv += '\n';
    })

    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text\csv; charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'population.csv';
    hiddenElement.click(); 
}


// Calculate Averages

function AverageSpeed() {
    let sum = 0;
    for (let i = 0; i < dots.length; i++) {
        sum += dots[i].maxspeed;
    }
    AVG_speed = Math.round(sum/dots.length * 10) / 10;
}

function AverageSize() {
    let sum = 0;
    for (let i = 0; i < dots.length; i++) {
        sum += dots[i].size;
    }
    AVG_size = Math.round(sum/dots.length * 10) / 10;
}

function AverageSense() {
    let sum = 0;
    for (let i = 0; i < dots.length; i++) {
        sum += dots[i].sense;
    }
    AVG_sense = Math.round(sum/dots.length * 10) / 10;
}