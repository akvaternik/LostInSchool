package web.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mongodb.DB;
import com.mongodb.MongoClient;
import org.jongo.Jongo;
import org.jongo.MongoCollection;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.net.UnknownHostException;

@Controller
public class IndexController {

    @RequestMapping("/getJSON/{destination}")
    @ResponseBody
    public String getJSON(@PathVariable String destination) throws UnknownHostException, JsonProcessingException {
        DB db = new MongoClient().getDB("LostInSchool");
        Jongo jongo = new Jongo(db);
        MongoCollection views = jongo.getCollection("views");
        JSONObject jsonObject = views.findOne("{name: " + "'" + destination + "'}").projection("{_id:0}").as(JSONObject.class);

        return  jsonObject.toJSONString();
    }
}