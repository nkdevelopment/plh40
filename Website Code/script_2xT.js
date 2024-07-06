<!DOCTYPE html>
<html lang="en">
<head>
	<link rel="shortcut icon" href="#">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"> -->

    <title>ThingSpeak Channel Temperatures Chart</title>
	
 <style>
		body {
			background-color: #009688;
		}
		
        /* CSS to display canvas and div in the same row */
        .container {
            display: flex;
            align-items: center;
        }

        /* Optional styles for the canvas */
        .custom-canvas {
            width: 220px; /* Fixed width for the canvas */
            height: 220px; /* Set the canvas height as needed */
			border: 2px solid blue;
			margin: 5px;
			padding: 5px;
			background-color: #ddffdd;
        }

        /* Optional styles for the div */
        .custom-div {
            flex: 1; /* The div will take the rest of the available space */
			border: 2px solid blue;
			margin: 5px;
			padding: 5px;
			background-color: #ddffdd;
        }
		
		#btn_clear_channel {
			width: 234px;
			margin: 5px;
			padding: 5px;
			background-color: #ddffdd;
			border: 2px solid blue;
			color: black;
			text-align: center;
			text-decoration: none;
			font-weight: bold;
			display: inline-block;
			font-size: 12px;
			cursor: pointer;
		}
		
		#myHeading {
			width: 234px;
			margin: 5px;
			padding: 4px 5px 5px 5px;
			background-color: #ddffdd;
			border: 2px solid blue;
			color: black;
			text-align: center;
			text-decoration: none;
			font-weight: bold;
			display: inline-block;
			font-size: 12px;
            flex: 1;
		}
		
		
		
		/* Media query to switch flex direction to column on smaller screens */
        @media (max-width: 1000px) {
            .container {
                flex-direction: column;
            }

            .custom-canvas {
                width: 100%; /* The canvas will take full width on smaller screens */
            }

            .custom-div {
                flex: none; /* Reset flex value to its initial value, allowing it to wrap */
                width: 100%; /* The div will take full width on smaller screens */
                margin-top: 10px; /* Add some space between canvas and div when they are stacked */
            }
			
    </style>
	
	<meta http-equiv="refresh" content="19">
    <script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="gauge.min.js"></script>
	
	
</head>

<body>

	<div class="container">
		<button id="btn_clear_channel">Clear channel - Start new session</button>
		<p id="myHeading">Ενδείξεις Θερμοκρασιών</p>
    </div>


	<div class="container">
		<canvas class="custom-canvas" id="GaugeTempT1"></canvas>
		<div class="custom-div" id="ChartTempT1"></div>
    </div>
	
	<div class="container">
		<canvas class="custom-canvas" id="GaugeTempT2"></canvas>
		<div class="custom-div" id="ChartTempT2"></div>
    </div>
	
	<div class="container">
		<canvas class="custom-canvas" id="GaugeTempT3"></canvas>
		<div class="custom-div" id="ChartTempT3"></div>
    </div>
	
	<div class="container">
		<canvas class="custom-canvas" id="GaugeTempT4"></canvas>
		<div class="custom-div" id="ChartTempT4"></div>
    </div>
	
	<div class="container">
		<canvas class="custom-canvas" id="GaugeTempT5"></canvas>
		<div class="custom-div" id="ChartTempT5"></div>
    </div>
	
	<div class="container">
		<canvas class="custom-canvas" id="GaugeTempT6"></canvas>
		<div class="custom-div" id="ChartTempT6"></div>
    </div>
	
	

	<!-- Η παρακάτω γραμμή εισάγει matlab visualization -->
	<!-- <iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/apps/matlab_visualizations/520711"></iframe> -->
	
	<!-- <script src="script_t1.js"></script> -->
	<script src="script_2xT.js"></script>
	
	
	<script src="delete-channel-temps.js"></script>
	
	
	
</body>
</html>

