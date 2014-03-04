var ecran;
var current_user;
var current_view;
var actions;

function selection(obj){					
	var objs = document.getElementsByClassName("obj");
   	for(var i=0; i<objs.length; i++) {
		objs[i].style.border ="none";
    	}
	obj.style.borderWidth = "1px";
	obj.style.borderStyle = "solid";
	obj.style.borderColor =  "blue";
}

function isSelected(name){
    var objs = document.getElementsByClassName("obj");
    var bool = false;
	if(objs.length == 0){
		return false;
	}
    for(var i=0; i<objs.length; i++){
        if((objs[i].style.borderColor == "blue") && (objs[i].name == name)){
            bool = true;
        }
    }

	return bool;
}

function indexSelected(){
    var objs = document.getElementsByClassName("obj");
    for(var i=0; i<objs.length; i++){
        if(objs[i].style.borderColor == "blue"){
            return i;
        }
    }
    return null;
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
    var actionsString = getActions();
    $.ajax({type: "POST",
        url: "/save/" + current_user + "/" + inventory + "/" + current_view + "/" + actionsString,
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

function getActions(){
    var actionsJSON = [];
    for(var i=0; i<actions.length; i++) {
        var name = actions[i];
        actionsJSON.push({"name": name});
    }
    var actionsString = JSON.stringify(actionsJSON);
    return actionsString;
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
            var actionsJSON = json['actions'];
            load_actions(actionsJSON);
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

function load_actions(actionsJSON){
    for(var i=0;i<actionsJSON.length;i++){
        var nom = actionsJSON[i].name;
        actions.push(nom);
    }
}


function add_object(source,nom){
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

function remove_selected_object(){
    var liste = document.getElementById("liste");
    var objs = document.getElementsByClassName("obj");
    liste.removeChild(objs[indexSelected()].parentNode.parentNode);
}

function add_action(action){
    actions.push(action);
}

function fait(action){
    for(var i=0;i<actions.length;i++){
        if(action === actions[i]){
            return true;
        }
    }
    return false;
}

function achievements_screen(){
    var achievements_screen = document.getElementById("achievements_screen");
    if(achievements_screen.style.display == "none"){
        achievements_screen.style.display = "block";
    }
    else{
        achievements_screen.style.display = "none";
    }
}
/*
function unlock_achievement(name){
    $.ajax({type: "GET",
        url: "/unlock_achievement/" + name,
        dataType: "text",
        success: function(source) {
            var achievement = getAchievement(name);
            achievement.src = source;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}
*/

function unlock_achievement(name){
    var source = "../../img/smile.jpg"
    var achievement = getAchievement(name);
    achievement.src = source;
}

function getAchievement(name){
    var achievements_table = document.getElementById("achievements_table");
    var lines = achievements_table.children;
    for(var i=0;i<lines.length;i++){
        var line = lines[i];
        var cells = line.children;
        for(var j=0;j<cells.length;j++){
            var cell = cells[j];
            var img = cell.children[0];
            if(img.name == name){
                return img;
            }
        }
    }
    return null;
}







$(document).ready(function() {
	ecran = $("#ecran_principal");
    actions = [];
	chargeView('login');
});