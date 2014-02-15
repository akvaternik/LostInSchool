package web.controller;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import org.jongo.Jongo;
import org.jongo.MongoCollection;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import java.net.UnknownHostException;

@Controller
public class LoginController {

    @RequestMapping("/login/{user}/{pwd}")
    @ResponseBody
    public String login(@PathVariable String user, @PathVariable String pwd) throws UnknownHostException {
        String access = "";

        DB db = new MongoClient().getDB("LostInSchool");
        Jongo jongo = new Jongo(db);
        MongoCollection users = jongo.getCollection("users");
        JSONObject jsonObject = users.findOne("{userID: " + "'" + user + "'}").projection("{_id:0}").as(JSONObject.class);
        if(jsonObject == null){
            return access;
        }

        String userID = (String) jsonObject.get("userID");
        String password = (String) jsonObject.get("password");

        if(userID.equals(user) && password.equals(pwd)){
            access = "ok";
            /*Cookie loginCookie = new Cookie("user",user);
            //setting cookie to expiry in 30 mins
            loginCookie.setMaxAge(30*60);
            response.addCookie(loginCookie);
            response.sendRedirect("LoginSuccess.jsp");*/
        }
        return access;
    }

    @RequestMapping("/subscribe/{user}/{pwd}")
    @ResponseBody
    public String subscribe(@PathVariable String user, @PathVariable String pwd) throws UnknownHostException {
        String status = "";
        DB db = new MongoClient().getDB("LostInSchool");
        Jongo jongo = new Jongo(db);
        MongoCollection users = jongo.getCollection("users");
        JSONObject jsonObject = users.findOne("{userID: " + "'" + user + "'}").projection("{_id:0}").as(JSONObject.class);
        if(jsonObject == null){
            status = "ok";
            users.insert("{userID: " + "'" + user + "', password: " + "'" + pwd + "'}");
            return status;
        }
        else{
            status = "fail";
            return status;
        }
    }

}
