var ecran;
var current_user;
var current_view;

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
                current_view = newView.name;
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
                    current_user = user;
                    document.getElementById("sauvegarde").setAttribute("style", "display: block");
                    load_game();
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
                    current_view = "Ping";
                    chargeView(current_view);
                    current_user = user;
                    document.getElementById("sauvegarde").setAttribute("style", "display: block");
                    save();
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
    var inventory = getInventory();
    $.ajax({type: "POST",
        url: "/save/" + current_user + "/" + inventory + "/" + current_view,
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

function getInventory(){
    var inventory = [];
    var objs = document.getElementsByClassName("obj");
    for(var i=0; i<objs.length; i++) {
        var name = objs[i].name;
        var src = objs[i].src.split("/");
        src = src[src.length-1];
        src = src.substring(0,src.length-4);
        inventory.push({"name": name, "src": src});
    }
    var inventoryString = JSON.stringify(inventory);
    return inventoryString;
}

function load_game(){

    $.ajax({type: "POST",
        url: "/load_game/" + current_user,
        dataType: "text",
        success: function(jsonString) {
            var json = jQuery.parseJSON(jsonString);
            var inventory = json['inventory'];
            load_inventory(inventory);
            chargeView(json['current_view']);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function load_inventory(inventory){
    for(var i=0;i<inventory.length;i++){
        var nom = inventory[i].name;
        var source = "../../img/".concat(inventory[i].src,".jpg");
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var img = document.createElement("img");
        img.setAttribute("class","obj");
        img.setAttribute("src",source);
        img.setAttribute("style","border: none");
        img.setAttribute("onclick","selection(this)");
        img.setAttribute("name",nom);
        td.appendChild(img);
        tr.appendChild(td);
        document.getElementById("liste").appendChild(tr);
    }

}

function add_inventory(source,nom){
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var img = document.createElement("img");
    img.setAttribute("class","obj");
    img.setAttribute("src",source);
    img.setAttribute("style","border: none");
    img.setAttribute("onclick","selection(this)");
    img.setAttribute("name",nom);
    td.appendChild(img);
    tr.appendChild(td);
    var liste = document.getElementById("liste");
    liste.insertBefore(tr, liste.firstChild);
}

$(document).ready(function() {
	ecran = $("#ecran_principal");
	chargeView('login');
});