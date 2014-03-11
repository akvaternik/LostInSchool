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
import java.io.UnsupportedEncodingException;
import java.net.UnknownHostException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Controller
public class LoginController {

    @RequestMapping("/login/{user}/{pwd}")
    @ResponseBody
    public String login(@PathVariable String user, @PathVariable String pwd) throws UnknownHostException, NoSuchAlgorithmException, UnsupportedEncodingException {
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

        MessageDigest md = MessageDigest.getInstance("SHA-512");
        md.update(pwd.getBytes("UTF-8"));
        byte[] bytes = md.digest();
        StringBuffer hexString = new StringBuffer();
        for (int i = 0; i < bytes.length; i++) {
            String hex = Integer.toHexString(0xff & bytes[i]);
            if(hex.length()==1){
                hexString.append('0');
            }
            hexString.append(hex);
        }
        String pwd_crypted =  hexString.toString();

        if(userID.equals(user) && password.equals(pwd_crypted)){
            access = "ok";
        }
        return access;
    }

    @RequestMapping("/subscribe/{user}/{pwd}")
    @ResponseBody
    public String subscribe(@PathVariable String user, @PathVariable String pwd) throws UnknownHostException, NoSuchAlgorithmException, UnsupportedEncodingException {
        String status = "";
        DB db = new MongoClient().getDB("LostInSchool");
        Jongo jongo = new Jongo(db);
        MongoCollection users = jongo.getCollection("users");
        JSONObject jsonObject = users.findOne("{userID: " + "'" + user + "'}").projection("{_id:0}").as(JSONObject.class);
        if(jsonObject == null){
            status = "ok";
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(pwd.getBytes("UTF-8"));
            byte[] bytes = md.digest();
            StringBuffer hexString = new StringBuffer();
            for (int i = 0; i < bytes.length; i++) {
                String hex = Integer.toHexString(0xff & bytes[i]);
                if(hex.length()==1){
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            String pwd_crypted =  hexString.toString();
            users.insert("{userID: " + "'" + user + "', password: " + "'" + pwd_crypted + "', inventory: [], actions: [], achievements: []}");
            return status;
        }
        else{
            status = "fail";
            return status;
        }
    }

    @RequestMapping("/save/{user}/{inventory}/{current_view}/{actions}/{achievements}")
    @ResponseBody
    public String save(@PathVariable String user, @PathVariable String inventory, @PathVariable String current_view, @PathVariable String actions, @PathVariable String achievements) throws UnknownHostException {
        DB db = new MongoClient().getDB("LostInSchool");
        Jongo jongo = new Jongo(db);
        MongoCollection users = jongo.getCollection("users");
        users.update("{userID: " + "'" + user + "'}").with("{$set: {inventory :" + inventory + "}}");
        users.update("{userID: " + "'" + user + "'}").with("{$set: {current_view :" + "'" + current_view + "'" + "}}");
        users.update("{userID: " + "'" + user + "'}").with("{$set: {actions :" + actions + "}}");
        users.update("{userID: " + "'" + user + "'}").with("{$set: {achievements :" + achievements + "}}");

        return "ok";
    }

    @RequestMapping("/load_game/{user}")
    @ResponseBody
    public String load_game(@PathVariable String user) throws UnknownHostException {
        DB db = new MongoClient().getDB("LostInSchool");
        Jongo jongo = new Jongo(db);
        MongoCollection users = jongo.getCollection("users");
        JSONObject jsonObject = users.findOne("{userID: " + "'" + user + "'}").projection("{_id:0, userID:0, password:0}").as(JSONObject.class);

        return jsonObject.toJSONString();
    }




}
