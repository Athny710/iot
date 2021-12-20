$(document).ready(function(){

    const updateInterval = 2500;
    const numberElements = 10;
    var updateCount = 0
    var myChart = $("#myChart");
    var seguro = 1;

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
            crossDomain: true,
            dataType: "json",
            url:"http://3.212.89.55:8090/api/temperatura/temps"
        }).done(addData).fail(function(e){
            console.log(e);
        });
        setTimeout(updateData, updateInterval);
    }

    function addData(data){
        if(data){
            var today = new Date();
            time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
            myChartInstance.data.labels.push(time);
            myChartInstance.data.datasets.forEach((dataset)=>{dataset.data.push(data.temperatura)});
            if(updateCount > numberElements){
                myChartInstance.data.labels.shift();
                myChartInstance.data.datasets[0].data.shift();
            }else{
                updateCount++;
            }
            if(data.temperatura<21 && data.temperatura>9){
                $('#tempInstValue').css("color","#f2b705");
                $("#tempInstValue").html(data.temperatura);
            }else{
                seguro=0
                $('#tempInstValue').css("color","#f22805");
                $("#tempInstValue").html(data.temperatura);
            }
            
            if(data.pre == 0){
                $("#person").hide();
                $("#span").hide();
            }else{
                $("#person").show();
                $("#span").show();
            }
            if(data.pre== 1 || data.temperatura>20 || data.temperatura<10){
                $("#inseguro").show();
                $("#seguro").hide();
                $("#msg").html("Habitación Insegura");
            }else{
                $("#inseguro").hide();
                $("#seguro").show();
                $("#msg").html("Habitación Segura");
            }
        }
        myChartInstance.update();
    }

    updateData();
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