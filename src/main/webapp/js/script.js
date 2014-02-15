var ecran;

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
            url: "/getJSON/" + destination,
            dataType: "text",
            success: function(newViewString) {
                var newView = jQuery.parseJSON(newViewString);
                ecran.load(newView.html);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
    });
}

function login(user, pwd){
    if(user != "" && pwd != ""){
        $.ajax({type: "GET",
            url: "/login/" + user + "/" + pwd,
            dataType: "text",
            success: function(access) {
                if (access === "ok"){
                    chargeView('Ping');
                }
                else{
                    alert("Either user name or password is wrong.");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    }
    else{
        alert("Please enter your user name and your password.")
    }
}

function subscribe(user, pwd){
    if(user != "" && pwd != ""){
        $.ajax({type: "POST",
            url: "/subscribe/" + user + "/" + pwd,
            dataType: "text",
            success: function(status) {
                if(status === "ok"){
                    chargeView('Ping');
                }
                else{
                    alert("User name is already used, please choose another one.");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    }
    else{
        alert("Please enter your user name and your password.")
    }
}

$(document).ready(function() {
	ecran = $("#ecran_principal");
	chargeView('login');
});