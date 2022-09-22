import coreUrls from '../../core/lib/core-urls'

export default {
    GET_APPLICATION: coreUrls.BACKEND + 'getApplication',
    REPORT: coreUrls.BACKEND + 'report',
    DOCUMENTS: coreUrls.BACKEND + 'documents',
    DOCUMENT_TYPES: coreUrls.BACKEND + 'documentTypes',
    GET_APPLICATION_BY_ID: coreUrls.BACKEND + 'getApplicationById',
    UPDATE_INFO: coreUrls.BACKEND + 'updateInfo',
    INSERT_AUTHOR: coreUrls.BACKEND + 'insertAuthor',
    SEARCH_AUTHOR: coreUrls.BACKEND + 'searchAuthor',
    ADD_EX_AUTHOR: coreUrls.BACKEND + 'addExAuthor',
    UPD_AUTHORS_PERSON_INFO: coreUrls.BACKEND + 'updateAuthorPersonalInfo',
    UPD_AUTHORS_PASSPORT: coreUrls.BACKEND + 'updateAuthorPassport',
    UPD_AUTHORS_JOB: coreUrls.BACKEND + 'updateAuthorJob',
}
// CREATE_DOCUMENT: new Address("create", exceptions.ERROR_GET(), exceptions.ERROR_GET()),
//     //new
//     REPORT: new Address("report", exceptions.ERROR_GET()),
//     USER_INFO: new Address("userinfo", exceptions.ERROR_GET()),
//     DOCUMENT_TYPES: new Address("documentTypes", exceptions.ERROR_GET()),
//     EMPLOYMENTS_ID_DOCUMENTS: new Address("employments/:employeeId/documents", exceptions.ERROR_GET()),
//     EMPLOYMENTS_ID_ASSIGNMENTS: new Address("employments/:employeeId/assignments/:term", exceptions.ERROR_GET()),
//     DOCUMENTS: new Address("documents", exceptions.ERROR_GET()),
//     DOCUMENTS_ID: new Address("documents/:id", exceptions.ERROR_GET()),
//
//     DELETE_DOCUMENT: new Address("documents/:id", exceptions.ERROR_GET()),
//     CLONE_DOCUMENT: new Address("documents/:id/clone", exceptions.ERROR_GET()),
//
//     DOCUMENT_CONTENT: new Address("documents/:id/content", exceptions.ERROR_GET()),
//     DOCUMENT_EXECUTION: new Address("documents/:id/content/:executionId", exceptions.ERROR_GET()),
