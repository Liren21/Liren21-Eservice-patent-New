package edu.omsu.eservice.patent.security;

import org.pac4j.core.config.Config;
import org.pac4j.core.http.RelativeCallbackUrlResolver;
import org.pac4j.sparkjava.CallbackRoute;
import org.pac4j.sparkjava.DefaultHttpActionAdapter;
import org.pac4j.sparkjava.SecurityFilter;
import spark.Request;
import spark.Response;
import spark.servlet.SparkApplication;

import static spark.Spark.*;

public class EserviceRoutes implements SparkApplication {
    static final String AUTHORIZER_NAME = "student";
    final String appUrl;
    final String appRoot;
    final String allowedDomains;
    final ProbeAuthRoute probeAuthRoute;
    final LogoutRoute logoutRoute;
    private final CallbackRoute callBackRoute;
    private final SecurityFilter securityFilter;

    public EserviceRoutes(String appRoot, String appUrl, String dasHost, String dasServerUri, String dasDataUri, String dasClientId, String dasSecret, String scope) {
        allowedDomains = dasHost;
        this.appUrl = appUrl;
        this.appRoot = appRoot;

        EserviceClient eserviceClient = new EserviceClient(dasServerUri, dasDataUri, scope);
        eserviceClient.setKey(dasClientId);
        eserviceClient.setSecret(dasSecret);
        eserviceClient.setCallbackUrlResolver(new RelativeCallbackUrlResolver());

        Config config = new Config(appRoot + "/j_oauth_check", eserviceClient);
        config.setHttpActionAdapter(new DefaultHttpActionAdapter());
        config.addAuthorizer(AUTHORIZER_NAME, new EservicePersonAuthorizer());

        securityFilter = new SecurityFilter(config, "EserviceClient", AUTHORIZER_NAME);
        probeAuthRoute = new ProbeAuthRoute();
        logoutRoute = new LogoutRoute(dasServerUri + "/logout.do");
        callBackRoute = new CallbackRoute(config);
    }

    void corsFilter(Request req, Response res) {
        res.header("Access-Control-Allow-Origin", allowedDomains);
        res.header("Access-Control-Allow-Credentials", "true");
        if ("OPTIONS".equals(req.requestMethod())) {
            res.header("Access-Control-Max-Age", "3600");
            res.header("Access-Control-Allow-Methods", "GET");
        }
    }

    @Override
    public void init() {
        before(appRoot + "/", securityFilter);
        get(appRoot + "/", (Request req, Response res) -> {
            if (!res.raw().isCommitted())
                res.redirect(appUrl);
            return null;
        });

        before(appRoot + "/auth/probe_auth", this::corsFilter);
        get(appRoot + "/auth/probe_auth", probeAuthRoute);

        before(appRoot + "/j_xdomain_logout", this::corsFilter);
        get(appRoot + "/j_xdomain_logout", logoutRoute);

        get(appRoot + "/j_oauth_check", callBackRoute);
        post(appRoot + "/j_oauth_check", callBackRoute);

    }
}
