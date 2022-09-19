package edu.omsu.eservice.patent.security;

import org.pac4j.core.authorization.authorizer.ProfileAuthorizer;
import org.pac4j.core.context.WebContext;
import org.pac4j.core.exception.HttpAction;

import java.util.List;

public class EservicePersonAuthorizer extends ProfileAuthorizer<EserviceProfile> {
    @Override
    protected boolean isProfileAuthorized(WebContext context, EserviceProfile profile) throws HttpAction {
        if (profile == null) {
            return false;
        }
        return profile.getPersonId() != null;
    }

    @Override
    public boolean isAuthorized(WebContext context, List<EserviceProfile> profiles) throws HttpAction {
        return isAnyAuthorized(context, profiles);
    }
}
