var ecran;
var current_user;
var current_view;
var actions = [];
var achievements = [];

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
                document.getElementById("ecran_principal").style.display = "none";
                ecran.load(newView.html);
                current_view = newView.name;
                ecran.onload = document.getElementById("ecran_principal").style.display = "block";
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
                    document.getElementById("logout").setAttribute("style", "display: block");
                    load_game();
                    createCookie("userID",current_user,1);
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
        alert("Either user name or password is invalid.");
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
                    current_view = "sortie_pomme_normal";
                    chargeView(current_view);
                    current_user = user;
                    document.getElementById("sauvegarde").setAttribute("style", "display: block");
                    document.getElementById("logout").setAttribute("style", "display: block");
                    createCookie("userID",current_user,1);
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
        alert("Either user name or password is invalid.");
    }
}

function logout(){
    eraseCookie("userID");
    location.reload();
}

function save(){
    var inventory = getInventory();
    var actionsString = getActions();
    var achievementsString = getAchievements();
    $.ajax({type: "POST",
        url: "/save/" + current_user + "/" + inventory + "/" + current_view + "/" + actionsString + "/" + achievementsString,
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

function getAchievements(){
    var achievementsJSON = [];
    for(var i=0; i<achievements.length; i++) {
        var name = achievements[i];
        achievementsJSON.push({"name": name});
    }
    var achievementsString = JSON.stringify(achievementsJSON);
    return achievementsString;
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
            var achievementsJSON = json['achievements'];
            load_actions(actionsJSON);
            load_achievements(achievementsJSON);
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
        var source = "../../img/".concat(inventory[i].src,".png");
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var img = document.createElement("img");
        img.setAttribute("class","obj");
        img.setAttribute("src",source);
        img.setAttribute("style","border: none");
        img.setAttribute("onclick","selection(this)");
        img.setAttribute("name",nom);
        img.setAttribute("title",nom.replace(/_/g," "));
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

function load_achievements(achievementsJSON){
    for(var i=0;i<achievementsJSON.length;i++){
        var nom = achievementsJSON[i].name;
        unlock_achievement(nom);
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
    img.setAttribute("title",nom.replace(/_/g," "));
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


function remove_object(name){
    var liste = document.getElementById("liste");
    var objs = document.getElementsByClassName("obj");

    for(var i=0; i<objs.length; i++){
        if(objs[i].name == name){
            liste.removeChild(objs[i].parentNode.parentNode);
        }
    }

}

function add_action(action){
    actions.push(action);
}

function add_achievement(achievement){
    achievements.push(achievement);
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

function unlock_achievement(name){
    $.ajax({type: "GET",
        url: "/unlock_achievement/" + name,
        dataType: "text",
        success: function(source) {
            var achievement = getAchievement(name);
            achievement.src = source;
            achievement.title = name.replace(/_/g," ");
            add_achievement(name);
            pop_up_achievement(name,source);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function getAchievement(name){
    var all_achievements = document.getElementsByClassName("achievement");
    for(var i=0;i<all_achievements.length;i++){
        var img = all_achievements[i];
        if(img.name == name){
                return img;
        }
    }
    return null;
}

function pop_up_achievement(name,source){
    var achievement_div = document.createElement("div");
    achievement_div.setAttribute("id","pop_up_achievement");
    var text = "Vous avez débloqué le succès: " + "<br/>" + "<strong>" + "<p style='color: green'>" + name.replace(/_/g," ") +"</p>" + "</strong>";
    var text_div = document.createElement("div");
    text_div.setAttribute("id","text_pop_up_achievement");
    text_div.style.color = "white";
    text_div.innerHTML = text;
    var img = document.createElement("img");
    img.setAttribute("id","img_pop_up_achievement");
    img.setAttribute("src",source);
    achievement_div.appendChild(img);
    achievement_div.appendChild(text_div);
    achievement_div.setAttribute("onclick","achievements_screen()");
    achievement_div.style.display = "none";
    document.getElementById("jeu").appendChild(achievement_div);
    $("#pop_up_achievement").fadeIn(1000);
    setTimeout('$("#pop_up_achievement").fadeOut(4000)',2000);
    setTimeout("remove(document.getElementById('pop_up_achievement'))",6000);
}

function remove(element){
    element.parentNode.removeChild(element);
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

$(document).ready(function() {
	ecran = $("#ecran_principal");
	chargeView('login');
});