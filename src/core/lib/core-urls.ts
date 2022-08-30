

import settingsService from '../../app/settings-service'

export default {
    DOMAIN: settingsService.domainUrl,
    BACKEND: `${settingsService.domainUrl}/backend/`,
    LOGOUT: `${settingsService.domainUrl}/backend/j_xdomain_logout`,
    PROBE_AUTH: `${settingsService.domainUrl}/backend/auth/probe_auth`,
}
