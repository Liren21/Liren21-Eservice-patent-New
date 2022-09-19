package edu.omsu.eservice.patent.security;

import org.pac4j.core.context.Pac4jConstants;
import org.pac4j.core.profile.AttributesDefinition;
import org.pac4j.oauth.profile.OAuth20Profile;

public class EserviceProfile extends OAuth20Profile {
    private transient final static AttributesDefinition ATTRIBUTES_DEFINITION = new EserviceAttributesDefinition();

    @Override
    public AttributesDefinition getAttributesDefinition() {
        return ATTRIBUTES_DEFINITION;
    }

    public String getDomain() {
        return (String) getAttribute(EserviceAttributesDefinition.DOMAIN);
    }

    public Long getPersonId() {
        return (Long) getAttribute(EserviceAttributesDefinition.PERSON_ID);
    }

    @Override
    public String getUsername() {
        return (String) getAttribute(Pac4jConstants.USERNAME);
    }
}
