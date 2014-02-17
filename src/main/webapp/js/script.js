var ecran;
var current_user;

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
    var re = new RegExp("[a-zA-Z0-9]+");
    if(user == re.exec(user) && pwd == re.exec(pwd)){
        $.ajax({type: "GET",
            url: "/login/" + user + "/" + pwd,
            dataType: "text",
            success: function(access) {
                if (access === "ok"){
                    chargeView('Ping');
                    current_user = user;
                    document.getElementById("sauvegarde").setAttribute("style", "display: block");
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
        alert("Either user name or password is invalid.")
    }
}

function subscribe(user, pwd){
    var re = new RegExp("[a-zA-Z0-9]+");
    if(user == re.exec(user) && pwd == re.exec(pwd)){
        $.ajax({type: "POST",
            url: "/subscribe/" + user + "/" + pwd,
            dataType: "text",
            success: function(status) {
                if(status === "ok"){
                    chargeView('Ping');
                    current_user = user;
                    document.getElementById("sauvegarde").setAttribute("style", "display: block");
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
        alert("Either user name or password is invalid.")
    }
}

function save(){
    $.ajax({type: "POST",
        url: "/save/" + current_user,
        dataType: "text",
        success: function(status) {
            if(status === "ok"){
                alert("Game saved!");
            }
            else{
                alert("Save error!");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}





$(document).ready(function() {
	ecran = $("#ecran_principal");
	chargeView('login');
});