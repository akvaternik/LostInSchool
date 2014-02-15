package web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;

@Controller
public class LoginController {

    @RequestMapping("/login/{user}/{pwd}")
    @ResponseBody
    public String login(@PathVariable String user, @PathVariable String pwd){
        String access = "";
        String userID = "Adrien";
        String password = "coucou";

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

}
