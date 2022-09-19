package edu.omsu.eservice.patent.security;

import org.pac4j.core.profile.ProfileManager;
import org.pac4j.sparkjava.SparkWebContext;
import spark.Request;
import spark.Response;
import spark.Route;

import static javax.servlet.http.HttpServletResponse.SC_FORBIDDEN;
import static spark.Spark.halt;

public class ProbeAuthRoute implements Route {
    @Override
    public String handle(Request request, Response response) throws Exception {
        final SparkWebContext context = new SparkWebContext(request, response);
        final ProfileManager<EserviceProfile> manager = new ProfileManager<>(context);
        if (!manager.isAuthenticated()) {
            halt(SC_FORBIDDEN);
        }
        return "";
    }
}
