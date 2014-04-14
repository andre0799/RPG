/* Send sockets ======================================================================================================================*/
function send_socket(id, type, param){
	// Send sockets
	console.log('sending');
	
	document.getElementById('id').value = id;
	document.getElementById('type').value = type;
	document.getElementById('params').value = param;

	$('#send').click();
}

/* WebSockets =============================================================================================================================== */ 
var websocket;

$(document).ready(function(){
	// Connection.
	var wsUri = "ws://192.168.0.20:9090/demo/server.php"; 	
	websocket = new WebSocket(wsUri); 
	
	websocket.onopen = function(ev) {
		$('#message_box').append("<div class=\"system_msg\">Connected!</div>");
		// Initializes Player
		initialize();
	}
	
	// Function to send socket
	$('#send').click(function(){
		var msg = {
			id: $('#id').val(),
			type: $('#type').val(),
			params: $('#params').val()
		};
		// Send the Socket
		websocket.send(JSON.stringify(msg));
	});
	
	
	//#### Message received from server ======================================================================================
	websocket.onmessage = function(ev) {
		
		var msg = JSON.parse(ev.data); //PHP sends Json data
		
		var id = msg.id;
		var type = msg.type;
		var param = msg.params;
		

		if(type == 'system') {
			
			$('#message_box').append("<div class=\"system_msg\">"+param+"</div>");
		}
		else {
			netPlayer(id, type, param);
			$('#message_box').append("<div style=\"color:#FFF\">ID:"+id+", Type:"+type+", Params:"+param+"</div>");
		}
		
		// Da scroll no bagulho
		d = $('#message_box');
		d.scrollTop(d.prop("scrollHeight"));		

	};
	
	websocket.onerror	= function(ev){$('#message_box').append("<div class=\"system_error\">Error Occurred - "+ev.data+"</div>");}; 
	websocket.onclose 	= function(ev){$('#message_box').append("<div class=\"system_msg\">Connection Closed</div>");}; 
});