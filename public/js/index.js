var estado = 1;
var matriz = [[0,0,0],[0,0,0],[0,0,0]];
var divs;
var rayita;
var button;
var viewport = document.getElementsByTagName("BODY")[0];
reset();

function render(matriz){
  var html = "";
  html += '    <div class="box"> ';
  for (var i = 0; i < matriz.length; i++) {
  	for (var j = 0; j < matriz[0].length; j++) {
  		var classN = "";
  		if (matriz[i][j] == 1){
  			classN = ' equis';
  		} else if (matriz[i][j] == -1){
  			classN = ' circle';
  		}
  		html += ' <div id="box-'+(i+1)+'-'+(j+1)+'" class="totito-box'+ classN +'"></div>';
  	}
  }
  html += '</div> '
  html += '<div id="rayita" class="rayita"></div>';
  html += '<button id="button">Reset</button>';
  return html;
}
function addEvents(){
  divs = document.getElementsByClassName("totito-box");
  rayita = document.getElementById('rayita');
  button = document.getElementById('button');
  button.addEventListener('click',reset);
  for (var i=0; i < divs.length; i++){
	divs[i].addEventListener('click',jugarEstado);
  }
}

function reset(){
	matriz = [[0,0,0],[0,0,0],[0,0,0]];
	estado = 1;
	viewport.innerHTML = render(matriz);
	addEvents();
	rayita.className = "rayita";
	for (var i = 0; i < divs.length; i++) {
		divs[i].className = "totito-box";
	}	
}
function cambiarEstado(estado){
	if (estado==-1){
		return 1;
	} else return -1;
}
function evaluar(id){
	row = parseInt(id.replace('box-','').split('-')[0])-1;
	col = parseInt(id.replace('box-','').split('-')[1])-1;	
	dir=0;
	ganar = false;
	matriz[row][col]=estado;
	if ( (matriz[row][0]+matriz[row][1]+matriz[row][2]==-3) || (matriz[row][0]+matriz[row][1]+matriz[row][2]==3) ){
		ganar = true;
		dir = 3;
		rayita.classList.add("row-"+(row+1));
	} else if ((matriz[0][col]+matriz[1][col]+matriz[2][col] == -3) || (matriz[0][col]+matriz[1][col]+matriz[2][col] == 3)){
		ganar = true;
		dir = 1;
		rayita.classList.add("col-"+(col+1));
	} else if ((matriz[0][0]+matriz[1][1]+matriz[2][2]==-3)||(matriz[0][0]+matriz[1][1]+matriz[2][2]==3)){
		ganar = true;
		dir = 4;
	} else if ((matriz[2][0]+matriz[1][1]+matriz[0][2]==-3)||(matriz[2][0]+matriz[1][1]+matriz[0][2]==3)){
		ganar = true;
		dir = 2;
	}
	if (ganar){
		rayita.classList.add("dir-"+dir);
		if (estado == 1){
			alert("Ganó jugador 1");
			reset();
		} else {
			alert("Ganó jugador 2");
			reset();
		}
	}else{
		if ((matriz[0].includes(0)==0) && (matriz[1].includes(0)==0) && (matriz[2].includes(0)==0)){
			alert("Empate");
			reset();
		}
	}
}

function jugarEstado(){
	if (this.classList.length == 1) {
		evaluar(this.id);
		viewport.innerHTML = render(matriz);
		addEvents();
		estado = cambiarEstado(estado);
	}
}