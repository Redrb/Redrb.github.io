/**
 * 
 */
"use strict";
(function(){
	
	var menuBoton = document.getElementById("botonMenu");
	var menuBotonDesplegado=document.getElementById("botonMenuDesplegado");
	
	menuBoton.onclick= desplegarMenu;
	menuBotonDesplegado.onclick= cerrarMenu;
	
	

	function desplegarMenu() {
		document.getElementById("mySidebar").style.display = "block";
		}		
	
	function cerrarMenu() {
		document.getElementById("mySidebar").style.display = "none";
	}
	
	
})();