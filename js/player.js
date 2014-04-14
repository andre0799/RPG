/* Sounds */
var sounds_sword = new Audio("sword_attack.wav");




/* Self Player ========================================================================================================================= */
function initialize() {
	/* Write Map 
	map = document.getElementById('map');
	map.style.height = (map_height * SQUARE)+'px';
	map.style.width = (map_width * SQUARE)+'px';
	*/
	/* Write Char */
	ch = document.getElementById('char');
	ch.style.left = (x * SQUARE)+'px';
	ch.style.top = (y * SQUARE) - HALF_SQUARE+'px';
	ch.style.background = 'url(img/'+params.sprite+')';
	
	$('#char #username').html(params.user);
	
	send_socket(params.user, 'initialize', ('1,1,1,'+params.sprite));
	
}

function animate(x, y) {
	//console.log("x: "+x+" y:"+y);
	document.getElementById('char').style.zIndex = y;
	//console.log("z-index mainChar: "+document.getElementById('char').style.zIndex);
	$('#char').animate({
                        left: x*32,
                        top: y*32-16 
                        },
    speed, "linear", function() {
    	anim = false;
    }
    );
}


/* Key Events ======================================================================================================================== */

function checkKey(e) {
	
    e = e || window.event;
	
	
    if (e.keyCode == '38') {
    e.preventDefault();
       // Cima
       if(!anim && y>0 && checkMove("up")){
            $('#char').attr('class','char_up_animate');
            y--;
			animate(x, y);
			send_socket(params.user, 'move', x+','+y);
			anim = true;
        }
        
    }
    else if (e.keyCode == '40' ) {
    // Baixo
    	e.preventDefault();
		if(!anim && y<map_height-1 && checkMove("down")){
			$('#char').attr('class','char_down_animate');
			y++;
            animate(x, y);
            send_socket(params.user, 'move', x+','+y);
            anim = true;
		}
	
    }
    else if (e.keyCode == '37') {
       // Left
       	e.preventDefault();
       if(!anim && x>0 && checkMove("left")){
            $('#char').attr('class','char_left_animate');
            x--;
            animate(x, y);
            send_socket(params.user, 'move', x+','+y);
            anim = true;
		}
    }
    else if (e.keyCode == '39') {
       // Right
       	e.preventDefault();
       if(!anim && x<map_width-1 && checkMove("right")){
            $('#char').attr('class','char_right_animate');
            x++;
            animate(x, y);
            send_socket(params.user, 'move', x+','+y);
            anim = true;
		}
    }
    
}

function checkKey2(e) {
	
    e = e || window.event;

    if (e.keyCode == '40') {
    // Baixo
    send_socket(params.user, 'direction', 3);
	$('#char').attr('class','char_down');
    }
    else if(e.keyCode == '38'){	
    // Cima
    send_socket(params.user, 'direction', 1);
	$('#char').attr('class','char_up');
    }
    else if(e.keyCode == '37'){	
    // Left
    send_socket(params.user, 'direction', 4);
	$('#char').attr('class','char_left');
    }
    else if(e.keyCode == '39'){	
    // Right
    send_socket(params.user, 'direction', 2);
	$('#char').attr('class','char_right');
    }
    
    
    else if(e.keyCode == '88'){	
    // Attack - Melee
    //send_socket(params.user, 'direction', 2);
	attack_melee(check_direction());
    }
}


/* Attack - Melee ===================================================================================================== */
function attack_melee(dir){
	if(dir == 1){
		x_melee = x;
		y_melee = y-1;		
	} else if(dir == 2){
		x_melee = x+1;
		y_melee = y;
	} else if(dir == 3){
		x_melee = x;
		y_melee = y+1;
	} else if(dir == 4){
		x_melee = x-1;
		y_melee = y;
	}
	
	render_melee_attack(x_melee,y_melee);
	for(key in chars)
	{
		console.log("MELEE: "+key+", x/y "+chars[key][0]+" "+chars[key][1]);
		if(chars[key][0] == x_melee && chars[key][1] == y_melee)
		{
			send_socket(params.user, 'attack_melee', key+','+x_melee+','+y_melee);
		}
		
	}
}


/* Attack - Melee ===================================================================================================== */
function render_melee_attack(x_melee, y_melee){
	sounds_sword.pause();
	sounds_sword.play();
	$("#body").append('<div id='+id+' style="top:'+(y_melee*SQUARE)+'px;left:'+(x_melee*SQUARE)+'px;position:absolute;z-index:'+y_melee+'; width: 32px; height: 32px; background:#FF0000"></div>');
}


/* Check collision ==================================================================================================== */
function collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
    }

function check_collision(){
	if(collision($('#char'),$('#target'))){
		alert('Touched!');
	} else {
		alert('No collision');
	}
}

/* Check direction of char ========================================================================================== */
function check_direction() {
	if($('#char').hasClass('char_up'))
		return 1;
	if($('#char').hasClass('char_right'))
		return 2;
	if($('#char').hasClass('char_down'))
		return 3;
	if($('#char').hasClass('char_left'))
		return 4;	
}


/* Check if move is possible ======================================================================================== */
 function checkMove(direction)
 {
 	console.log(x+" "+y)
    switch(direction)
    {
        case "up":
            //console.log("up");
            if(mapMatrix[(y-1)][x]==1)
            {
                return false;
            }
            return true;	
        case "down":
            //console.log("down");
            if(mapMatrix[(y+1)][x]==1)
            {
                return false;
            }
            return true;
        case "left":
            //console.log("left");
            if(mapMatrix[y][(x-1)]==1)
            {
                return false;
            }
            return true;
        case "right":
            //console.log("right");
            if(mapMatrix[y][(x+1)]==1)
            {
                return false;
            }
            return true;
    }
 }
 
 
 /* Chat ================================================================================================================ */
function submit_text() {

message = document.getElementById('msg').value;

// Send socket
send_socket(params.user, 'message', document.getElementById('msg').value);
document.getElementById('msg').value = '';

$('#char #text').html(message);
$('#char #chat').fadeIn();

setTimeout(function(){	
	$('#char #chat').fadeOut();
	},3000);
return false;
}






/* Get Parameters of URL (user, sprite) =====================================================================================================================*/
function getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}


 