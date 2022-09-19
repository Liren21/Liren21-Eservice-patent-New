package edu.omsu.eservice.patent.security;

import com.github.scribejava.core.builder.api.DefaultApi20;
import com.github.scribejava.core.model.OAuthConfig;
import com.github.scribejava.core.oauth.OAuth20Service;
import com.github.scribejava.core.utils.OAuthEncoder;

public class EserviceApi extends DefaultApi20 {
    private final String OAUTH_ENDPOINT;
    private static final String AUTHORIZATION_URL = "%s/oauth/authorize?client_id=%s&response_type=%s&redirect_uri=%s&scope=%s&state=%s";

    public EserviceApi(String oauthEndPoint) {
        OAUTH_ENDPOINT = oauthEndPoint;
    }

    @Override
    public String getAccessTokenEndpoint() {
        return OAUTH_ENDPOINT + "/oauth/token";
    }

    @Override
    public String getAuthorizationUrl(OAuthConfig config) {
        return String.format(AUTHORIZATION_URL, OAUTH_ENDPOINT, config.getApiKey(), config.getResponseType(), OAuthEncoder.encode(config.getCallback()), OAuthEncoder.encode(config.getScope()), config.getState());
    }

    @Override
    public OAuth20Service createService(OAuthConfig config) {
        return new EserviceService(this, config);
    }
}
