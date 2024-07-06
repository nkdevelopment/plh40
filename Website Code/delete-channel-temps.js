
document.getElementById("btn_clear_channel").onclick = function() {myFunction()};

function myFunction() {
	
	if (confirm("Are you sure?") == true) {
	
	fetch('https://api.thingspeak.com/channels/2274990/feeds.json?api_key=8SS6HMRMLNAGW0BF',{
            method:"DELETE"
        })
        .then(response => response.json())
        .then(data => console.log(data))
		
		
		location.reload();
		
	  } else {
	  }
	  

}
