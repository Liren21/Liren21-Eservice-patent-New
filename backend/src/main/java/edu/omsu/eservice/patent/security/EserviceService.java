package edu.omsu.eservice.patent.security;

import com.github.scribejava.core.builder.api.DefaultApi20;
import com.github.scribejava.core.model.AbstractRequest;
import com.github.scribejava.core.model.OAuthConfig;
import com.github.scribejava.core.oauth.OAuth20Service;

public class EserviceService extends OAuth20Service {

    public EserviceService(DefaultApi20 api, OAuthConfig config) {
        super(api, config);
    }

    protected <T extends AbstractRequest> T createAccessTokenRequest(String code, T request) {
        super.createAccessTokenRequest(code, request);
        if (!this.getConfig().hasGrantType()) {
            request.addParameter("grant_type", "authorization_code");
        }

        return request;
    }
}
