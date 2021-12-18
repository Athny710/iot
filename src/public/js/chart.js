$(document).ready(function(){

    const updateInterval = 500;
    const numberElements = 20;
    var updateCount = 0
    var myChart = $("#myChart");

    var options = {
        scales: {
            xAxes:[{
                type: "time",
                time:{
                    displayFormats: {
                        milisecond: "mm:ss:SSS"
                    }
                }
            }],
            yAxes:[{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            display: false
        },
        tootips:{
            enabled: false
        },
        plugins: {
            legend:{
                display: false
            }
        }
    };

    var myChartInstance = new Chart(myChart, {
        type: 'line',
        data: {
            datasets:[{
                data:0,
                fill: false,
                borderColor:'#f2b705',
                borderWidth: 1
            }]
        },
        options: Object.assign({}, options, {})
    });

    function updateData(){
        console.log("Updating data...");
        $.ajax({
            method: "GET",
            url:"http://localhost:3500/"
        }).done(addData).fail(function(e){
            console.log(e);
        });
        setTimeout(updateData, updateInterval);
    }

    function addData(data){
        if(data){
            myChartInstance.data.labels.push(new Date());
            myChartInstance.data.datasets.forEach((dataset)=>{dataset.data.push(data['temp'])});
            if(updateCount > numberElements){
                myChartInstance.data.labels.shift();
                myChartInstance.data.datasets[0].data.shift();
            }
        }else updateCount++;
        myChartInstance.update();
    }

    /*
    const data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            borderColor: '#f2b705',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend:{
                    display: false
                }
            }
        }
    };
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
    */
});