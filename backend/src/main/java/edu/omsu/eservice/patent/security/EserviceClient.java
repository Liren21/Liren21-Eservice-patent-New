package edu.omsu.eservice.patent.security;

import com.fasterxml.jackson.databind.JsonNode;
import com.github.scribejava.core.builder.api.BaseApi;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.oauth.OAuth20Service;
import org.pac4j.core.exception.HttpAction;
import org.pac4j.oauth.client.BaseOAuth20StateClient;
import org.pac4j.oauth.profile.JsonHelper;

public class EserviceClient extends BaseOAuth20StateClient<EserviceProfile> {
    final String BASE_URI;
    final String DATA_URI;
    final String scope;

    public EserviceClient(String baseUri, String dataUri, String scope) {
        BASE_URI = baseUri;
        DATA_URI = dataUri;
        this.scope = scope;
//        scope = "eservice_tutor";
        setResponseType("code");
    }

    @Override
    protected BaseApi<OAuth20Service> getApi() {
        return new EserviceApi(BASE_URI);
    }

    @Override
    protected String getProfileUrl(OAuth2AccessToken oAuth2AccessToken) {
        return DATA_URI + "/whois/"+scope;
    }

    @Override
    protected String getOAuthScope() {
        return scope;
    }

    @Override
    protected EserviceProfile extractUserProfile(String body) throws HttpAction {
        EserviceProfile profile = new EserviceProfile();
        JsonNode json = JsonHelper.getFirstNode(body);
        if (json != null) {
            json = (JsonNode) JsonHelper.getElement(json, "data");
            if (json != null) {
                for (final String attribute : profile.getAttributesDefinition().getPrimaryAttributes()) {
                    profile.addAttribute(attribute, JsonHelper.getElement(json, attribute));
                }
            }
        }
        return profile;
    }
}
