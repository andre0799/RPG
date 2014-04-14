/* Map ========================================================================================================================= */

var mapMatrix= [
				[0,1,1,0,0,0,0,1,0,0],
				[0,0,0,0,0,0,0,1,1,0],
				[1,1,0,0,0,0,0,0,1,0],
				[0,0,0,0,0,1,1,0,0,0],
				[0,0,0,0,1,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,1,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,1,1,1,0,0,0],
				[1,1,0,0,0,0,0,0,0,0]
									];



/* Show colision matrix
 =================================================================================================================== */

function showMatrix()
{
	for(i=0;i<mapMatrix.length;i++)
	{
		for(j=0;j<mapMatrix[i].length;j++)
		{
			div =  document.getElementById(j+'_'+i).innerHTML=mapMatrix[i][j];

		}
	}
}									

/* Generate Map =================================================================================================================== */

var map = document.getElementById('map');
map.style.height = (map_width * SQUARE)+'px';
map.style.width = (map_height * SQUARE)+'px';

var sprite="Sprites/tileset/002-Woods01.png";



function paintObjects(){
	for(i=0;i<mapMatrix.length;i++)
	{
		for(j=0;j<mapMatrix[i].length;j++)
		{
			if(mapMatrix[i][j]==1)
			{
				$("#map").append('<div id="objects" style="position:absolute; z-index:1; width: 32px; height: 32px; left:'+j*32+'px; top:'+i*32+'px; background:url(img/Sprites/tileset/002-Woods01.png); background-position: 128px 0px;text-align:center;"></div>');
				console.log("i: "+i+" j:"+j );
			}
			
		}
	}
	
}


paintObjects();