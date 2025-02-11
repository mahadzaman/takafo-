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
 * @interface CreateSourcingPlanDTO
 */
export interface CreateSourcingPlanDTO {
    /**
     * List of target companies
     * @type {Array<string>}
     * @memberof CreateSourcingPlanDTO
     */
    'target_companies': Array<string>;
    /**
     * List of target job titles
     * @type {Array<string>}
     * @memberof CreateSourcingPlanDTO
     */
    'target_job_titles': Array<string>;
    /**
     * List of target locations
     * @type {Array<string>}
     * @memberof CreateSourcingPlanDTO
     */
    'target_locations': Array<string>;
    /**
     * Hands off list
     * @type {Array<string>}
     * @memberof CreateSourcingPlanDTO
     */
    'hands_off_list': Array<string>;
    /**
     * List of referrals
     * @type {Array<string>}
     * @memberof CreateSourcingPlanDTO
     */
    'referrals': Array<string>;
    /**
     * List of sourcing channels
     * @type {Array<string>}
     * @memberof CreateSourcingPlanDTO
     */
    'sourcing_channels': Array<string>;
    /**
     * List of career sites
     * @type {Array<string>}
     * @memberof CreateSourcingPlanDTO
     */
    'career_sites': Array<string>;
    /**
     * Growth strategy or approach
     * @type {string}
     * @memberof CreateSourcingPlanDTO
     */
    'grow': string;
    /**
     * Agency handling the sourcing
     * @type {Array<string>}
     * @memberof CreateSourcingPlanDTO
     */
    'agencies': Array<string>;
    /**
     * Is the database search automated?
     * @type {boolean}
     * @memberof CreateSourcingPlanDTO
     */
    'database_search_automated': boolean;
    /**
     * Job ID related to the sourcing plan
     * @type {string}
     * @memberof CreateSourcingPlanDTO
     */
    'job_id'?: string;
    /**
     * status
     * @type {string}
     * @memberof CreateSourcingPlanDTO
     */
    'status': string;
}

