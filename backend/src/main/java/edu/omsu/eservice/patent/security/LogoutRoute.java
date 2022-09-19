package edu.omsu.eservice.patent.security;

import org.pac4j.core.profile.ProfileManager;
import org.pac4j.sparkjava.SparkWebContext;
import spark.Request;
import spark.Response;
import spark.Route;

public class LogoutRoute implements Route {
    final String logoutRedirectUrl;

    public LogoutRoute(String logoutRedirectUrl) {
        this.logoutRedirectUrl = logoutRedirectUrl;
    }

    @Override
    public Object handle(Request req, Response resp) throws Exception {
        SparkWebContext context = new SparkWebContext(req, resp);
        ProfileManager manager = new ProfileManager(context);
        manager.logout();

        if (req.headers("X-Remote-Logout") == null) {
            //Local logout initiated by user via
            //in-app logout button click
            resp.redirect(logoutRedirectUrl);
            return "";
        }

        //Remote logout via crossdomain HTTP
        //initiated by DAS
        return "";
    }
}
