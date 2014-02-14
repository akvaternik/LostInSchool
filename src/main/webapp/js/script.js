﻿var ecran;

function selection(obj){					
	var objs = document.getElementsByClassName("obj");
   	for(i=0; i<objs.length; i++) {
		objs[i].style.border ="none";
    	}
	obj.style.borderWidth = "1px";
	obj.style.borderStyle = "solid";
	obj.style.borderColor =  "blue";
}

function isSelected(name){
	
	var objs = document.getElementsByName(name);
	if(objs.length == 0){
		return false;
	}
	return objs[0].style.borderColor == "blue";
}

function chargeView(destination){
    $.ajax({type: "GET",
            url:"/getJSON/" + destination,
            datatype: "json",
            success: function(newViewString) {
                var newView = jQuery.parseJSON(newViewString);
                document.getElementById("ecran_principal").innerHTML = newView.view;
            }
    });
}


$(document).ready(function() {
	ecran = $("#ecran_principal");
	chargeView('Ping');
});