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
import type { UpdateMilestonesStepsDTO } from './update-milestones-steps-dto';

/**
 * 
 * @export
 * @interface UpdateProjectMilestoneDTO
 */
export interface UpdateProjectMilestoneDTO {
    /**
     * 
     * @type {UpdateMilestonesStepsDTO}
     * @memberof UpdateProjectMilestoneDTO
     */
    'rap_send'?: UpdateMilestonesStepsDTO;
    /**
     * 
     * @type {UpdateMilestonesStepsDTO}
     * @memberof UpdateProjectMilestoneDTO
     */
    'rap_approve'?: UpdateMilestonesStepsDTO;
    /**
     * 
     * @type {UpdateMilestonesStepsDTO}
     * @memberof UpdateProjectMilestoneDTO
     */
    'shortlist_delivery'?: UpdateMilestonesStepsDTO;
    /**
     * 
     * @type {UpdateMilestonesStepsDTO}
     * @memberof UpdateProjectMilestoneDTO
     */
    'assessment_complete'?: UpdateMilestonesStepsDTO;
    /**
     * 
     * @type {UpdateMilestonesStepsDTO}
     * @memberof UpdateProjectMilestoneDTO
     */
    'hiring_decision'?: UpdateMilestonesStepsDTO;
    /**
     * 
     * @type {UpdateMilestonesStepsDTO}
     * @memberof UpdateProjectMilestoneDTO
     */
    'offer_approved'?: UpdateMilestonesStepsDTO;
    /**
     * 
     * @type {UpdateMilestonesStepsDTO}
     * @memberof UpdateProjectMilestoneDTO
     */
    'offer_accepted'?: UpdateMilestonesStepsDTO;
    /**
     * 
     * @type {string}
     * @memberof UpdateProjectMilestoneDTO
     */
    'start_date': string;
    /**
     * status
     * @type {string}
     * @memberof UpdateProjectMilestoneDTO
     */
    'status'?: string;
}

