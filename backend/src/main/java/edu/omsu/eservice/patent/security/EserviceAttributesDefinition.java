package edu.omsu.eservice.patent.security;

import org.pac4j.core.context.Pac4jConstants;
import org.pac4j.core.profile.AttributesDefinition;
import org.pac4j.core.profile.converter.Converters;

/**
 * @author voroshil
 * Date: 28.08.2016
 * Time: 20:34
 */
public class EserviceAttributesDefinition extends AttributesDefinition {
    public static final String PERSON_ID = "personId";
    public static final String DOMAIN = "domain";

    public EserviceAttributesDefinition() {
        primary(Pac4jConstants.USERNAME, Converters.STRING);
        primary(DOMAIN, Converters.STRING);
        primary(PERSON_ID, Converters.LONG);
    }
}
