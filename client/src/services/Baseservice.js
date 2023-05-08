import { BASE_URL } from './Authservice';

export const SERVICE = {

    PASSWORD: `${BASE_URL}/api/passwords`,
    PASSWORD_CREATE: `${BASE_URL}/api/password/new`,
    PASSWORD_SINGLE: `${BASE_URL}/api/password`,
    
    //  Folder
    FOLDER: `${BASE_URL}/api/folders`,
    FOLDER_CREATE: `${BASE_URL}/api/folder/new`,
    FOLDER_SINGLE: `${BASE_URL}/api/folder`,
    
    //user
    USERS: `${BASE_URL}/api/users`,
    USER_CREATE: `${BASE_URL}/api/user/new`,
    USER_SINGLE: `${BASE_URL}/api/user`,
    USERPW_SINGLE: `${BASE_URL}/api/userpw`,
    
    //designation
    DESIGNATIONS: `${BASE_URL}/api/designations`,
    DESIGNATION_CREATE: `${BASE_URL}/api/designation/new`,
    DESIGNATION_SINGLE: `${BASE_URL}/api/designation`,

    //assign password
    ASSIGNPASSWORDS: `${BASE_URL}/api/userassignments`,
    ASSIGNPASSWORD_CREATE: `${BASE_URL}/api/userassign/new`,
    ASSIGNPASSWORD_SINGLE: `${BASE_URL}/api/userassign`,
}