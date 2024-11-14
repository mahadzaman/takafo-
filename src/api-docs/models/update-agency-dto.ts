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


// May contain unused imports in some cases
// @ts-ignore
import type { ContactDto } from './contact-dto';

/**
 * 
 * @export
 * @interface UpdateAgencyDto
 */
export interface UpdateAgencyDto {
    /**
     * Name of the agency (optional)
     * @type {string}
     * @memberof UpdateAgencyDto
     */
    'name': string;
    /**
     * List of skills associated with the agency (optional)
     * @type {Array<Array<string>>}
     * @memberof UpdateAgencyDto
     */
    'skills': Array<Array<string>>;
    /**
     * Geography region where the agency operates (optional)
     * @type {Array<Array<string>>}
     * @memberof UpdateAgencyDto
     */
    'geographies': Array<Array<string>>;
    /**
     * Terms of payment or service (optional)
     * @type {string}
     * @memberof UpdateAgencyDto
     */
    'terms': string;
    /**
     * agency rating (optional)
     * @type {number}
     * @memberof UpdateAgencyDto
     */
    'rating': number;
    /**
     * Ownership period of the agency in months (optional)
     * @type {number}
     * @memberof UpdateAgencyDto
     */
    'ownership_period': number;
    /**
     * Array of contacts associated with the agency (optional)
     * @type {Array<ContactDto>}
     * @memberof UpdateAgencyDto
     */
    'contacts': Array<ContactDto>;
}

