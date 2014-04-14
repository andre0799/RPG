/* NetPlayer ======================================================================================================================== */
function netPlayer(id, type, params){

	switch(type){
		/* GET: x, y, direction, sprite */
		case 'initialize':
			parameter = params.split(',');
			initializeNetPlayer(id, parameter[0], parameter[1], parameter[2], parameter[3]);
			changeDirection(id, parameter[2]);
		break;
		
		case 'move':
			if(chars[id]){
				parameter = params.split(',');
				exe_anim(id, chars[id][0], chars[id][1], parameter[0], parameter[1]);
			}
		break;
		
		case 'direction':
			changeDirection(id, params);
		break;
		
		case 'message':
			showMessage(id, params);
		break;
		
		default:
			console.log("Type is undefined");
		break;
	
	}

}



function initializeNetPlayer(id, x_char, y_char, direction, sprite) {
	/* Checks if char was already initialized */
	if(!chars[id] && id != params.user){
	
		console.log("Initializing "+sprite);
		chars[id]=[x_char, y_char, direction, sprite];
		// Writes object on the map
		$("#body").append('<div id='+id+' class="char_down" style="top:'+(y_char*SQUARE-HALF_SQUARE)+'px;left:'+(x_char*SQUARE)+'px;position:absolute;z-index:'+y_char+'; width: 32px; height: 48px; background:url(img/'+sprite+');"><div id="username">'+id+'</div><div id="chat" class="chat_balloon"><div id="text">Peniana</div></div></div>');
	}
}

function moveNetObject(id, x_char, y_char) {
	/* Move netPlayer */
	$("#"+id).animate({
		left: x_char * SQUARE,
		top: y_char * SQUARE - HALF_SQUARE }, speed, "linear",   function() 
		{
			chars[id][0] = x_char;
			chars[id][1] = y_char;
		}
    );
}

function exe_anim(id,old_x,old_y,new_x,new_y)
{

	// Sets the z-index
	document.getElementById(id).style.zIndex = new_y;

	//Up
	if(old_x==new_x && old_y>new_y)
	{
        $("#"+id).attr('class','char_up_animate');
		moveNetObject(id, new_x, new_y);
	}
	//Down
	else if(old_x==new_x && old_y<new_y)
	{
		$("#"+id).attr('class','char_down_animate');
		moveNetObject(id, new_x, new_y);
	}
	//Left
	else if(old_x>new_x && old_y==new_y)
	{
		$("#"+id).attr('class','char_left_animate');
		moveNetObject(id, new_x, new_y);
	}
	//Right
	else if(old_x<new_x && old_y==new_y)
	{
		$("#"+id).attr('class','char_right_animate');
		moveNetObject(id, new_x, new_y);
	} else {
	
		
		$("#"+id).attr('class','char_down');
		
		moveNetObject(id, new_x, new_y);
	}
	
}


function changeDirection(id, direction){
/* Change player direction */

	//console.log('Changing direction '+direction);
	switch(direction){
		case '1':
			$("#"+id).attr('class','char_up');
		break;
		case '2':
			$("#"+id).attr('class','char_right');
		break;
		case '3':
			$("#"+id).attr('class','char_down');
		break;
		case '4':
			$("#"+id).attr('class','char_left');
		break;
		default:
			console.log('Buceta');
		break;
	
	}

}


function showMessage(id, message) {
	
	$('#'+id+' #text').html(message);
	$('#'+id+' #chat').fadeIn();
	setTimeout(function(){$('#'+id+' #chat').fadeOut();},3000);
	return true;
}