// Replace YOUR_THINGSPEAK_CHANNEL_ID and YOUR_THINGSPEAK_READ_API_KEY with your actual channel ID and read API key.

const channelID = '2277637'; // channel Current
const readAPIKey = '8UZ66DD0XJXK6SP3'; // channel Current

// Current channel
const channelID_Current = '2277637'; // channel Current
const readAPIKey_Current = '8UZ66DD0XJXK6SP3'; // channel Current

const apiURLGauge1c = `https://api.thingspeak.com/channels/2277637/fields/1/last.json?api_key=8UZ66DD0XJXK6SP3`;
const apiURLField1c = `https://api.thingspeak.com/channels/2277637/fields/1.json?api_key=8UZ66DD0XJXK6SP3&results=40`;

const apiURLGauge2c = `https://api.thingspeak.com/channels/2277637/fields/2/last.json?api_key=8UZ66DD0XJXK6SP3`;
const apiURLField2c = `https://api.thingspeak.com/channels/2277637/fields/2.json?api_key=8UZ66DD0XJXK6SP3&results=40`;

const apiURLGauge3p = `https://api.thingspeak.com/channels/2277637/fields/3/last.json?api_key=8UZ66DD0XJXK6SP3`;
const apiURLField3p = `https://api.thingspeak.com/channels/2277637/fields/3.json?api_key=8UZ66DD0XJXK6SP3&results=40`;

const apiURLGauge4p = `https://api.thingspeak.com/channels/2277637/fields/4/last.json?api_key=8UZ66DD0XJXK6SP3`;
const apiURLField4p = `https://api.thingspeak.com/channels/2277637/fields/4.json?api_key=8UZ66DD0XJXK6SP3&results=40`;


//let last3array = new Array(2);
//let counter =0;
let field1_array = new Array();
let field2_array = new Array();
let field3_array = new Array();
let field4_array = new Array();
let max1;
let min1;
let average;

// Function to initialize the program
async function initialize() {
    const dataChart1 = await fetchThingSpeakDataChart1(); // for Chart 1
    if (dataChart1 && dataChart1.feeds && dataChart1.feeds.length > 0) {
		console.log("dataChart1= "+dataChart1);
        createChart1(dataChart1);
    } else {  console.error('No dataChart1 available from ThingSpeak channel.');
    }
	
	const dataChart2 = await fetchThingSpeakDataChart2(); // for Chart 2
    if (dataChart2 && dataChart2.feeds && dataChart2.feeds.length > 0) {
		console.log("dataChart2= "+dataChart2);
        createChart2(dataChart2);
    } else { console.error('No dataChart2 available from ThingSpeak channel.');
    }
	
	const dataChart3 = await fetchThingSpeakDataChart3(); // for Chart 3
    if (dataChart3 && dataChart3.feeds && dataChart3.feeds.length > 0) {
		console.log("dataChart3= "+dataChart3);
        createChart3(dataChart3);
    } else { console.error('No dataChart3 available from ThingSpeak channel.');
    }
	
	const dataChart4 = await fetchThingSpeakDataChart4(); // for Chart 4
    if (dataChart4 && dataChart4.feeds && dataChart4.feeds.length > 0) {
		console.log("dataChart4= "+dataChart4);
        createChart4(dataChart4);
    } else { console.error('No dataChart4 available from ThingSpeak channel.');
    }
	
	
	const dataGauge1 = await fetchThingSpeakDataGauge1();
    if (dataGauge1 && dataGauge1.field1) {
        const valueGauge1 = parseFloat(dataGauge1.field1);
		console.log("valueGauge1= "+valueGauge1);
        createGauge1(valueGauge1);
    } else {  console.error('No valueGauge1 available from ThingSpeak channel.');
    }
	
	const dataGauge2 = await fetchThingSpeakDataGauge2();
    if (dataGauge2 && dataGauge2.field2) {
        const valueGauge2 = parseFloat(dataGauge2.field2);
		console.log("valueGauge2= "+valueGauge2);
        createGauge2(valueGauge2);
    } else { console.error('No valueGauge2 available from ThingSpeak channel.');
    }
	
	const dataGauge3 = await fetchThingSpeakDataGauge3();
    if (dataGauge3 && dataGauge3.field3) {
        const valueGauge3 = parseFloat(dataGauge3.field3);
		console.log("valueGauge3= "+valueGauge3);
        createGauge3(valueGauge3);
    } else { console.error('No valueGauge3 available from ThingSpeak channel.');
    }
	
	const dataGauge4 = await fetchThingSpeakDataGauge4();
    if (dataGauge4 && dataGauge4.field4) {
        const valueGauge4 = parseFloat(dataGauge4.field4);
		console.log("valueGauge4= "+valueGauge4);
        createGauge4(valueGauge4);
    } else { console.error('No valueGauge4 available from ThingSpeak channel.');
    }
	
	
}

// Function to fetch dataChart1 from ThingSpeak API for Chart 1
async function fetchThingSpeakDataChart1() {
    try {
        const response = await fetch(apiURLField1c);
        const dataChart1 = await response.json();
		console.log("createChart1 dataChart1= ", dataChart1);
		field1_array = dataChart1.feeds.map(robot => robot.field1);
		console.log("createChart1 field1_array= ", field1_array);
		max1 = Math.max.apply(null, field1_array);
		min1 = Math.min.apply(null, field1_array);
		let sum = 0;
		for (let i = 0; i < field1_array.length; i++ ) {
		  sum += parseFloat(field1_array[i]);
		}
		average = sum/field1_array.length;
		console.log("createChart1 field1_array max1= ", max1);
		console.log("createChart1 field1_array min1= ", min1);
		console.log("createChart1 field1_array average= ", average.toFixed(2));
        return dataChart1;
    } catch (error) {
        console.error('Error fetching ThingSpeak dataChart1:', error);
    }
}

// Function to fetch dataChart2 from ThingSpeak API for Chart 2
 async function fetchThingSpeakDataChart2() {
    try {
        const response = await fetch(apiURLField2c);
        const dataChart2 = await response.json();
		console.log("createChart dataChart2= ", dataChart2);
		field2_array = dataChart2.feeds.map(robot => robot.field2);
		console.log("createChart field2_array= ", field2_array);
		max1 = Math.max.apply(null, field2_array);
		min1 = Math.min.apply(null, field2_array);
		let sum = 0;
		for (let i = 0; i < field2_array.length; i++ ) {
		  sum += parseFloat(field2_array[i]);
		}
		average = sum/field2_array.length;
		console.log("createChart field2_array max1= ", max1);
		console.log("createChart field2_array min1= ", min1);
		console.log("createChart field2_array average= ", average.toFixed(2));
        return dataChart2;
    } catch (error) {
        console.error('Error fetching ThingSpeak dataChart2:', error);
    }
 }
 
 // Function to fetch dataChart3 from ThingSpeak API for Chart 3
 async function fetchThingSpeakDataChart3() {
    try {
        const response = await fetch(apiURLField3p);
        const dataChart3 = await response.json();
		console.log("createChart dataChart3= ", dataChart3);
		field3_array = dataChart3.feeds.map(robot => robot.field3);
		console.log("createChart field3_array= ", field3_array);
		max1 = Math.max.apply(null, field3_array);
		min1 = Math.min.apply(null, field3_array);
		let sum = 0;
		for (let i = 0; i < field3_array.length; i++ ) {
		  sum += parseFloat(field3_array[i]);
		}
		average = sum/field3_array.length;
		console.log("createChart field3_array max1= ", max1);
		console.log("createChart field3_array min1= ", min1);
		console.log("createChart field3_array average= ", average.toFixed(2));
        return dataChart3;
    } catch (error) {
        console.error('Error fetching ThingSpeak dataChart3:', error);
    }
 }
 
 // Function to fetch dataChart4 from ThingSpeak API for Chart 4
 async function fetchThingSpeakDataChart4() {
    try {
        const response = await fetch(apiURLField4p);
        const dataChart4 = await response.json();
		console.log("createChart dataChart4= ", dataChart4);
		field4_array = dataChart4.feeds.map(robot => robot.field4);
		console.log("createChart field4_array= ", field4_array);
		max1 = Math.max.apply(null, field4_array);
		min1 = Math.min.apply(null, field4_array);
		let sum = 0;
		for (let i = 0; i < field4_array.length; i++ ) {
		  sum += parseFloat(field4_array[i]);
		}
		average = sum/field4_array.length;
		console.log("createChart field4_array max1= ", max1);
		console.log("createChart field4_array min1= ", min1);
		console.log("createChart field4_array average= ", average.toFixed(2));
        return dataChart4;
    } catch (error) {
        console.error('Error fetching ThingSpeak dataChart4:', error);
    }
 }
 

// Function to create the Highcharts chart 1
function createChart1(dataChart1) {
    const chartData = dataChart1.feeds.map((feed) => ({
        x: new Date(feed.created_at).getTime(),
        y: parseFloat(feed.field1) // Assuming the dataChart1 you want to plot is in 'field1'. Change accordingly if needed.
    }));

    Highcharts.chart('ChartCurrent', {
		chart: {
			backgroundColor: '#ddffdd',
			plotBackgroundColor: '#ffffff',
			height: 220,
			type: 'spline',
			events: {
			  render: function() {
				// var chart = this;
				// chart.renderer.text(
				  // 'min= '+min1+ 'A.............average= '+average.toFixed(2)+' A.............max= '+max1+ ' A' ,
				  // 300,
				  // 20
				// ).attr({
				  // fill: 'red'
				// }).add().toFront()
				// .css({
					// color: 'green',
					// fontWeight: 'bold',
					// fontSize: '10px'
				  // });
			  }
			}
		},
        title: {
            text: null
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Ένταση ρεύματος'
            },
			max: max1+1,
			min: min1-1,
			plotLines: [{
				color: 'red',
				width: 1,
				value: max1,
				label: {
					text: 'max Ampere= '+max1+ ' A',
					style: {
						color: 'red',
						fontWeight: 'bold'
					},
					align: 'right',
					y: -10, /*moves label up*/
					x: -10
				},
				dashStyle: 'dash'
			}]
        },
		legend: {
			floating: true,
			layout: 'vertical',
			borderWidth: 1,
			borderColor: '#444444',
			borderCornerRadius: 5,
			shadow: true,
			backgroundColor: '#009688',
			align: 'left',
			x: 50,
			verticalAlign: 'top',
			y: -0,
			itemStyle: {
				color: '#ffffff',
				listStyle: 'none',
				listStyleImage: 'none'
			},
			itemHiddenStyle: {
				color: '#888888'
			},
			itemHoverStyle: {
				color: 'white'
			},
			maxHeight: 250,
			reversed: true
		},
        series: [{
            name: 'Ένταση ηλεκτρικού ρεύματος',
            data: chartData,
            type: 'spline',
            tooltip: {
                valueDecimals: 2 // Set the number of decimals to display in the tooltip
            },
			label: {
				onArea: false
			}
        }]
    });
}

// Function to create the Highcharts chart 2
function createChart2(dataChart2) {
    const chartData = dataChart2.feeds.map((feed) => ({
        x: new Date(feed.created_at).getTime(),
        y: parseFloat(feed.field2) // Assuming the dataChart2 you want to plot is in 'field2'. Change accordingly if needed.
    }));

    Highcharts.chart('ChartOnOff', {
		
		rangeSelector: {
			selected: 1
		},
		
		chart: {
			backgroundColor: '#ddffdd',
			plotBackgroundColor: '#ffffff',
			height: 220,
			type: 'line',
			events: {
			  render: function() {
				// var chart = this;
				// chart.renderer.text(
				  // 'min= '+min1+ '°C.............average= '+average.toFixed(2)+' °C.............max= '+max1+ ' °C' ,
				  // 250,
				  // 20
				// ).attr({
				  // fill: 'red'
				// }).add().toFront()
				// .css({
					// color: 'green',
					// fontWeight: 'bold',
					// fontSize: '10px'
				  // });
			  }
			}
		},
		
        title: {
            text: null
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'ON / OFF'
            },
			max: 2,
			min: -1,
			
			plotLines: [{
				color: 'red',
				width: 1,
				value: max1,
				label: {
					// text: 'max T2= '+max1+ ' °C',
					// style: {
						// color: 'red',
						// fontWeight: 'bold'
					// },
					// align: 'right',
					// y: -10, /*moves label up*/
					// x: -10
				},
				dashStyle: 'dash'
			}]
        },
		legend: {
			floating: true,
			layout: 'vertical',
			borderWidth: 1,
			borderColor: '#444444',
			borderCornerRadius: 5,
			shadow: true,
			backgroundColor: '#009688',
			align: 'left',
			x: 50,
			verticalAlign: 'top',
			y: 0,
			itemStyle: {
				color: '#ffffff',
				listStyle: 'none',
				listStyleImage: 'none'
			},
			itemHiddenStyle: {
				color: '#888888'
			},
			itemHoverStyle: {
				color: 'white'
			},
			maxHeight: 250,
			reversed: true
		},
        series: [{
            name: 'ON/OFF Συμπιεστή',
            data: chartData,
			step: 'center',
            tooltip: {
                valueDecimals: 2 // Set the number of decimals to display in the tooltip
            },
			label: {
				onArea: false
			}
        }]
    });
}

// Function to create the Highcharts chart 3
function createChart3(dataChart3) {
    const chartData = dataChart3.feeds.map((feed) => ({
        x: new Date(feed.created_at).getTime(),
        y: parseFloat(feed.field3) // Assuming the dataChart3 you want to plot is in 'field3'. Change accordingly if needed.
    }));

    Highcharts.chart('ChartPressP1', {
		chart: {
			backgroundColor: '#ddffdd',
			plotBackgroundColor: '#ffffff',
			height: 220,
			type: 'spline',
			events: {
			  render: function() {
				var chart = this;

				chart.renderer.text(
				  'min= '+min1+ '°C.............average= '+average.toFixed(2)+' °C.............max= '+max1+ ' °C' ,
				  250,
				  20
				).attr({
				  fill: 'red'
				}).add().toFront()
				.css({
					color: 'green',
					fontWeight: 'bold',
					fontSize: '10px'
				  });
			  }
			}
		},
        title: {
            text: null
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Πίεση'
            },
			max: max1+1,
			min: min1-1,
			
			plotLines: [{
				color: 'red',
				width: 1,
				value: max1,
				label: {
					text: 'max T3= '+max1+ ' °C',
					style: {
						color: 'red',
						fontWeight: 'bold'
					},
					align: 'right',
					y: -10, /*moves label up*/
					x: -10
				},
				dashStyle: 'dash'
			}]
        },
		legend: {
			floating: true,
			layout: 'vertical',
			borderWidth: 1,
			borderColor: '#444444',
			borderCornerRadius: 5,
			shadow: true,
			backgroundColor: '#009688',
			align: 'left',
			x: 60,
			verticalAlign: 'top',
			y: 0,
			itemStyle: {
				color: '#ffffff',
				listStyle: 'none',
				listStyleImage: 'none'
			},
			itemHiddenStyle: {
				color: '#888888'
			},
			itemHoverStyle: {
				color: 'white'
			},
			maxHeight: 250,
			reversed: true
		},
        series: [{
            name: 'Πίεση P1',
            data: chartData,
            type: 'spline',
            tooltip: {
                valueDecimals: 2 // Set the number of decimals to display in the tooltip
            },
			label: {
				onArea: false
			}
        }]
    });
}

// Function to create the Highcharts chart 4
function createChart4(dataChart4) {
    const chartData = dataChart4.feeds.map((feed) => ({
        x: new Date(feed.created_at).getTime(),
        y: parseFloat(feed.field4) // Assuming the dataChart4 you want to plot is in 'field4'. Change accordingly if needed.
    }));

    Highcharts.chart('ChartPressP2', {
		chart: {
			backgroundColor: '#ddffdd',
			plotBackgroundColor: '#ffffff',
			height: 220,
			type: 'spline',
			events: {
			  render: function() {
				var chart = this;
				chart.renderer.text(
				  'min= '+min1+ '°C.............average= '+average.toFixed(2)+' °C.............max= '+max1+ ' °C' ,
				  250,
				  20
				).attr({
				  fill: 'red'
				}).add().toFront()
				.css({
					color: 'green',
					fontWeight: 'bold',
					fontSize: '10px'
				  });
			  }
			}
		},
        title: {
            text: null
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Πίεση'
            },
			max: max1+1,
			min: min1-1,
			
			plotLines: [{
				color: 'red',
				width: 1,
				value: max1,
				label: {
					text: 'max T4= '+max1+ ' °C',
					style: {
						color: 'red',
						fontWeight: 'bold'
					},
					align: 'right',
					y: -10, /*moves label up*/
					x: -10
				},
				dashStyle: 'dash'
			}]
        },
		legend: {
			floating: true,
			layout: 'vertical',
			borderWidth: 1,
			borderColor: '#444444',
			borderCornerRadius: 5,
			shadow: true,
			backgroundColor: '#009688',
			align: 'left',
			x: 50,
			verticalAlign: 'top',
			y: 0,
			itemStyle: {
				color: '#ffffff',
				listStyle: 'none',
				listStyleImage: 'none'
			},
			itemHiddenStyle: {
				color: '#888888'
			},
			itemHoverStyle: {
				color: 'white'
			},
			maxHeight: 250,
			reversed: true
		},
        series: [{
            name: 'Πίεση P2',
            data: chartData,
            type: 'spline',
            tooltip: {
                valueDecimals: 2 // Set the number of decimals to display in the tooltip
            },
			label: {
				onArea: false
			}
        }]
    });
}



// Function to fetch dataGauge1 from ThingSpeak API
async function fetchThingSpeakDataGauge1() {
    try {
        const response = await fetch(apiURLGauge1c);
        const dataGauge1 = await response.json();
        return dataGauge1;
    } catch (error) {
        console.error('Error fetching ThingSpeak dataGauge1:', error);
    }
}

// Function to fetch dataGauge2 from ThingSpeak API
async function fetchThingSpeakDataGauge2() {
    try {
        const response = await fetch(apiURLGauge2c);
        const dataGauge2 = await response.json();
        return dataGauge2;
    } catch (error) {
        console.error('Error fetching ThingSpeak dataGauge2:', error);
    }
}

// Function to fetch dataGauge3 from ThingSpeak API
async function fetchThingSpeakDataGauge3() {
    try {
        const response = await fetch(apiURLGauge3p);
        const dataGauge3 = await response.json();
        return dataGauge3;
    } catch (error) {
        console.error('Error fetching ThingSpeak dataGauge3:', error);
    }
}

// Function to fetch dataGauge4 from ThingSpeak API
async function fetchThingSpeakDataGauge4() {
    try {
        const response = await fetch(apiURLGauge4p);
        const dataGauge4 = await response.json();
        return dataGauge4;
    } catch (error) {
        console.error('Error fetching ThingSpeak dataGauge4:', error);
    }
}



// Function to create the gauge 1
function createGauge1(value) {
    const gauge = new RadialGauge({
        renderTo: 'GaugeCurrent',
        width: 220,
        height: 220,
		units: 'Ampere',
		title: 'Ένταση ρεύματος',
        minValue: 0,
        maxValue: 20,
        majorTicks: ['0','2', '4','6', '8','10', '12','14', '16','18', '20'],
        minorTicks: 2,
        ticksAngle: 270,
        startAngle: 45,
        strokeTicks: true,
        highlights: [
			{ from: 0, to: 0.5, color: 'rgba(0, 0, 255, .5)' },
            { from: 0.5, to: 5, color: 'rgba(255, 165, 0, .5)' },
            { from: 5, to: 20, color: 'rgba(200, 50, 50, .5)' },
        ],
        colorPlate: '#fff',
        borderShadowWidth: 0,
        borders: true,
        needleType: 'arrow',
        needleWidth: 2,
        needleCircleSize: 7,
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 1500,
        animationRule: 'linear'
    });

    gauge.value = value;
	gauge.units = "Ampere";
    gauge.draw();
}

// Function to create the gauge 2
function createGauge2(value) {
    const gauge = new RadialGauge({
        renderTo: 'GaugeOnOff',
        width: 220,
        height: 220,
		units: 'ON/OFF',
		title: 'ON/OFF Συμπιεστή',
        minValue: -40,
        maxValue: 80,
        majorTicks: ['-40','-30', '-20','-10', '0','10', '20','30', '40','50', '60','70', '80'],
        minorTicks: 2,
        ticksAngle: 270,
        startAngle: 45,
        strokeTicks: true,
        highlights: [
			{ from: -40, to: 0, color: 'rgba(0, 0, 255, .5)' },
            { from: 0, to: 40, color: 'rgba(255, 165, 0, .5)' },
            { from: 40, to: 80, color: 'rgba(200, 50, 50, .5)' },
        ],
        colorPlate: '#fff',
        borderShadowWidth: 0,
        borders: true,
        needleType: 'arrow',
        needleWidth: 2,
        needleCircleSize: 7,
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 1500,
        animationRule: 'linear'
    });

    gauge.value = value;
	gauge.units = "on/off";
    gauge.draw();
}

// Function to create the gauge 3
function createGauge3(value) {
    const gauge = new RadialGauge({
        renderTo: 'GaugePressP1',
        width: 220,
        height: 220,
		units: '°C',
		title: 'T3',
        minValue: -40,
        maxValue: 80,
        majorTicks: ['-40','-30', '-20','-10', '0','10', '20','30', '40','50', '60','70', '80'],
        minorTicks: 2,
        ticksAngle: 270,
        startAngle: 45,
        strokeTicks: true,
        highlights: [
			{ from: -40, to: 0, color: 'rgba(0, 0, 255, .5)' },
            { from: 0, to: 40, color: 'rgba(255, 165, 0, .5)' },
            { from: 40, to: 80, color: 'rgba(200, 50, 50, .5)' },
        ],
        colorPlate: '#fff',
        borderShadowWidth: 0,
        borders: true,
        needleType: 'arrow',
        needleWidth: 2,
        needleCircleSize: 7,
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 1500,
        animationRule: 'linear'
    });

    gauge.value = value;
	gauge.units = "bar";
    gauge.draw();
}

// Function to create the gauge 4
function createGauge4(value) {
    const gauge = new RadialGauge({
        renderTo: 'GaugePressP2',
        width: 220,
        height: 220,
		units: '°C',
		title: 'T4',
        minValue: -40,
        maxValue: 80,
        majorTicks: ['-40','-30', '-20','-10', '0','10', '20','30', '40','50', '60','70', '80'],
        minorTicks: 2,
        ticksAngle: 270,
        startAngle: 45,
        strokeTicks: true,
        highlights: [
			{ from: -40, to: 0, color: 'rgba(0, 0, 255, .5)' },
            { from: 0, to: 40, color: 'rgba(255, 165, 0, .5)' },
            { from: 40, to: 80, color: 'rgba(200, 50, 50, .5)' },
        ],
        colorPlate: '#fff',
        borderShadowWidth: 0,
        borders: true,
        needleType: 'arrow',
        needleWidth: 2,
        needleCircleSize: 7,
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 1500,
        animationRule: 'linear'
    });

    gauge.value = value;
	gauge.units = "bar";
    gauge.draw();
}


// Call the initialize function when the DOM is ready
document.addEventListener('DOMContentLoaded', initialize);
