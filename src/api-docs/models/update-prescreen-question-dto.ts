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
 * @interface UpdatePrescreenQuestionDto
 */
export interface UpdatePrescreenQuestionDto {
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdatePrescreenQuestionDto
     */
    'question_id'?: Array<string>;
    /**
     * 
     * @type {Array<Array<string>>}
     * @memberof UpdatePrescreenQuestionDto
     */
    'custom_questions': Array<Array<string>>;
    /**
     * status
     * @type {string}
     * @memberof UpdatePrescreenQuestionDto
     */
    'status': string;
}

