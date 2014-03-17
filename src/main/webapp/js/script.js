var ecran;
var current_user;
var current_view;
var actions = [];
var achievements = [];
var xhr;
var ajaxSave = 0;

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
                if(current_view != "login" && current_view != "unsubscribe" && current_view != "reset"){
                    save();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
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
                    document.getElementById("inventaire").setAttribute("style", "display: block");
                    document.getElementById("logout").setAttribute("style", "display: inline-block");
                    document.getElementById("reset").setAttribute("style", "display: inline-block");
                    document.getElementById("achievements").setAttribute("style", "display: inline-block");
                    document.getElementById("unsubscribe").setAttribute("style", "display: inline-block");
                    document.getElementById("subscribe").setAttribute("style", "display: none");
                    load_game();
                    createCookie("userID",current_user,1);
                }
                else{
                    alert("Either user name or password is wrong.");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        });
    }
    else{
        alert("Either user name or password is invalid.");
    }
}

function subscribe(user, pwd, conf_pwd){
    var re = new RegExp("[a-zA-Z0-9]+");
    if(user == re.exec(user) && pwd == re.exec(pwd)){
        if(pwd == conf_pwd){
            $.ajax({type: "POST",
                url: "/subscribe/" + user + "/" + pwd,
                dataType: "text",
                success: function(status) {
                    if(status === "ok"){
                        current_view = "intro";
                        current_user = user;
                        chargeView(current_view);
                        document.getElementById("inventaire").setAttribute("style", "display: block");
                        document.getElementById("logout").setAttribute("style", "display: inline-block");
                        document.getElementById("reset").setAttribute("style", "display: inline-block");
                        document.getElementById("achievements").setAttribute("style", "display: inline-block");
                        document.getElementById("unsubscribe").setAttribute("style", "display: inline-block");
                        document.getElementById("subscribe").setAttribute("style", "display: none");
                        createCookie("userID",current_user,1);
                    }
                    else{
                        alert("User name is already used, please choose another one.");
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            });
        }
        else{
            alert("Your confirmation password doesn't match your password.")
        }
    }
    else{
        alert("Either user name or password is invalid.");
    }
}

function unsubscribe(user, pwd){
    var re = new RegExp("[a-zA-Z0-9]+");
    if(user == re.exec(user) && pwd == re.exec(pwd)){
        $.ajax({type: "POST",
            url: "/unsubscribe/" + user + "/" + pwd,
            dataType: "text",
            success: function(status) {
                if (status === "ok"){
                    logout();
                }
                else{
                    alert("Either user name or password is wrong.");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        });
    }
    else{
        alert("Either user name or password is invalid.");
    }
}

function reset_game(user, pwd){
    var re = new RegExp("[a-zA-Z0-9]+");
    if(user == re.exec(user) && pwd == re.exec(pwd)){
        $.ajax({type: "POST",
            url: "/reset/" + user + "/" + pwd,
            dataType: "text",
            success: function(status) {
                if (status === "ok"){
                    alert("Votre jeu a été remis à zero!");
                    location.reload();
                }
                else{
                    alert("Either user name or password is wrong.");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
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
    if(ajaxSave > 0){
        xhr.abort();
    }
    var inventory = getInventory();
    var actionsString = getActions();
    var achievementsString = getAchievements();
    xhr = $.ajax({type: "POST",
        url: "/save/" + current_user + "/" + inventory + "/" + current_view + "/" + actionsString + "/" + achievementsString,
        dataType: "text",
        beforeSend: function(){ajaxSave++;},
        success: function(status) {
            if(status === "ok"){
                //alert("Game saved!");
            }
            else{
                alert("Save error!");
            }
            ajaxSave--;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if(xhr.status != 0){
                console.log(xhr.status);
                console.log(thrownError);
            }
            ajaxSave--;
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
    $.ajax({type: "GET",
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
            console.log(xhr.status);
            console.log(thrownError);
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
        load_achievement(nom);
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
    save();
}

function remove_selected_object(){
    var liste = document.getElementById("liste");
    var objs = document.getElementsByClassName("obj");
    liste.removeChild(objs[indexSelected()].parentNode.parentNode);
    save();
}


function remove_object(name){
    var liste = document.getElementById("liste");
    var objs = document.getElementsByClassName("obj");

    for(var i=0; i<objs.length; i++){
        if(objs[i].name == name){
            liste.removeChild(objs[i].parentNode.parentNode);
        }
    }
    save();
}

function add_action(action){
    if(!fait(action)){
        actions.push(action);
        save();
    }
}

function add_achievement(achievement){
    achievements.push(achievement);
    save();
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
    achievements_screen.style.display = "block";
}

function unlock_achievement(name){
    if(!unlocked_achievement(name)){
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
                console.log(xhr.status);
                console.log(thrownError);
            }
        });
    }
}

function unlocked_achievement(name){
    for(var i=0;i<achievements.length;i++){
        if(name === achievements[i]){
            return true;
        }
    }
    return false;
}


function load_achievement(name){
    $.ajax({type: "GET",
        url: "/unlock_achievement/" + name,
        dataType: "text",
        success: function(source) {
            var achievement = getAchievement(name);
            achievement.src = source;
            achievement.title = name.replace(/_/g," ");
            add_achievement(name);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
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

function discut(name,text,t){

    var t_N = t;
    var N = document.createElement("div");
    N.setAttribute("id","N");
    N.innerHTML = name;
    N.style.position = "absolute";
    N.style.top = t_N.toString() + "px";
    N.style.background = "white";
    N.style.zIndex = "3";
    N.style.left = "25px";
    N.style.padding = "5px";
    N.style.border = "solid 3px black";
    N.style.cursor = "default";
    document.getElementById("ecran_principal").appendChild(N);

    var t_I = t + 431 - 398;
    var I = document.createElement("img");
    I.setAttribute("id","I");
    I.setAttribute("src","../../img/bandeau_discussion.png");
    I.style.width = "900px";
    I.style.height = "154px";
    I.style.top = t_I.toString() + "px";
    I.style.zIndex = "3";
    document.getElementById("ecran_principal").appendChild(I);

    var t_T = t + 450 - 398;
    var T = document.createElement("div");
    T.setAttribute("id", "T");
    T.style.width = "858px";
    T.style.height = "104px";
    T.innerHTML = text;
    T.style.overflow = "auto";
    T.style.position = "absolute";
    T.style.top = t_T.toString() + "px";
    T.style.left = "25px";
    T.style.zIndex = "3";
    T.style.cursor = "default";
    document.getElementById("ecran_principal").appendChild(T);

    var t_C = t + 404 - 398;
    var C = document.createElement("img");
    C.setAttribute("id","C");
    C.setAttribute("src","../../img/croix.png");
    C.style.zIndex = "3";
    C.style.width = "45px";
    C.style.top = t_C.toString() + "px";
    C.style.right = "0px";
    C.setAttribute("onclick","quit_talk()");
    document.getElementById("ecran_principal").appendChild(C);
}

function bandeText(text,left,top,id,width){
    var T = document.createElement("div");
    T.setAttribute("id",id);
    document.getElementById("ecran_principal").appendChild(T);
    T.innerHTML = text;
    T.style.position = "absolute";
    T.style.top = top + "px";
    if(width != '0'){
        T.style.width = width + "px";
    }
    T.style.background = "white";
    T.style.zIndex = "3";
    T.style.left = left + "px";
    T.style.padding = "5px";
    T.style.border = "solid 3px black";
    T.style.cursor = "default";
}

function quit_achievements(){
    var achievements_screen = document.getElementById("achievements_screen");
    achievements_screen.style.display = "none";
}

$(document).ready(function() {
	ecran = $("#ecran_principal");
	chargeView('login');
});