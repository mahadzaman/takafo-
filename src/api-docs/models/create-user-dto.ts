/* tslint:disable */
/* eslint-disable */
/**
 * Takafo+
 * The Takafo API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface CreateUserDTO
 */
export interface CreateUserDTO {
    /**
     * The first name of the user
     * @type {string}
     * @memberof CreateUserDTO
     */
    'first_name': string;
    /**
     * The last name of the user
     * @type {string}
     * @memberof CreateUserDTO
     */
    'last_name': string;
    /**
     * The username of the user
     * @type {string}
     * @memberof CreateUserDTO
     */
    'user_name': string;
    /**
     * The email address of the user
     * @type {string}
     * @memberof CreateUserDTO
     */
    'email': string;
    /**
     * The Phone number of the user
     * @type {string}
     * @memberof CreateUserDTO
     */
    'phone': string;
    /**
     * The password of the user
     * @type {string}
     * @memberof CreateUserDTO
     */
    'password': string;
    /**
     * Roles Ids of user, user can have one or multiple roles
     * @type {Array<string>}
     * @memberof CreateUserDTO
     */
    'roles_id': Array<string>;
}

