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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, type RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import type { CreateJobAdvertDTO } from '../models';
// @ts-ignore
import type { UpdateJobAdvertDTO } from '../models';
/**
 * JobAdvertApi - axios parameter creator
 * @export
 */
export const JobAdvertApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CreateJobAdvertDTO} createJobAdvertDTO 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jobsControllerCreateJobAdvert: async (createJobAdvertDTO: CreateJobAdvertDTO, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createJobAdvertDTO' is not null or undefined
            assertParamExists('jobsControllerCreateJobAdvert', 'createJobAdvertDTO', createJobAdvertDTO)
            const localVarPath = `/v1/jobs/advert`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createJobAdvertDTO, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a job advert
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jobsControllerDeleteJobAdvert: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('jobsControllerDeleteJobAdvert', 'id', id)
            const localVarPath = `/v1/jobs/advert/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} [limit] 
         * @param {number} [offset] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jobsControllerFindAllJobAdvert: async (limit?: number, offset?: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/jobs/advert`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }

            if (offset !== undefined) {
                localVarQueryParameter['offset'] = offset;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jobsControllerFindOneJobAdvert: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('jobsControllerFindOneJobAdvert', 'id', id)
            const localVarPath = `/v1/jobs/advert/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get Job Advert by Job ID
         * @param {string} jobId ID of the job to fetch the associated job advert
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jobsControllerGetJobAdvertByJobId: async (jobId: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'jobId' is not null or undefined
            assertParamExists('jobsControllerGetJobAdvertByJobId', 'jobId', jobId)
            const localVarPath = `/v1/jobs/advert/by-job-id/{job_id}`
                .replace(`{${"job_id"}}`, encodeURIComponent(String(jobId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a job advert
         * @param {string} id 
         * @param {UpdateJobAdvertDTO} updateJobAdvertDTO 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jobsControllerUpdateJobAdvert: async (id: string, updateJobAdvertDTO: UpdateJobAdvertDTO, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('jobsControllerUpdateJobAdvert', 'id', id)
            // verify required parameter 'updateJobAdvertDTO' is not null or undefined
            assertParamExists('jobsControllerUpdateJobAdvert', 'updateJobAdvertDTO', updateJobAdvertDTO)
            const localVarPath = `/v1/jobs/advert/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateJobAdvertDTO, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * JobAdvertApi - functional programming interface
 * @export
 */
export const JobAdvertApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = JobAdvertApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {CreateJobAdvertDTO} createJobAdvertDTO 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async jobsControllerCreateJobAdvert(createJobAdvertDTO: CreateJobAdvertDTO, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.jobsControllerCreateJobAdvert(createJobAdvertDTO, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['JobAdvertApi.jobsControllerCreateJobAdvert']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Delete a job advert
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async jobsControllerDeleteJobAdvert(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.jobsControllerDeleteJobAdvert(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['JobAdvertApi.jobsControllerDeleteJobAdvert']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {number} [limit] 
         * @param {number} [offset] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async jobsControllerFindAllJobAdvert(limit?: number, offset?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.jobsControllerFindAllJobAdvert(limit, offset, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['JobAdvertApi.jobsControllerFindAllJobAdvert']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async jobsControllerFindOneJobAdvert(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.jobsControllerFindOneJobAdvert(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['JobAdvertApi.jobsControllerFindOneJobAdvert']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Get Job Advert by Job ID
         * @param {string} jobId ID of the job to fetch the associated job advert
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async jobsControllerGetJobAdvertByJobId(jobId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.jobsControllerGetJobAdvertByJobId(jobId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['JobAdvertApi.jobsControllerGetJobAdvertByJobId']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Update a job advert
         * @param {string} id 
         * @param {UpdateJobAdvertDTO} updateJobAdvertDTO 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async jobsControllerUpdateJobAdvert(id: string, updateJobAdvertDTO: UpdateJobAdvertDTO, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.jobsControllerUpdateJobAdvert(id, updateJobAdvertDTO, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['JobAdvertApi.jobsControllerUpdateJobAdvert']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * JobAdvertApi - factory interface
 * @export
 */
export const JobAdvertApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = JobAdvertApiFp(configuration)
    return {
        /**
         * 
         * @param {CreateJobAdvertDTO} createJobAdvertDTO 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jobsControllerCreateJobAdvert(createJobAdvertDTO: CreateJobAdvertDTO, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.jobsControllerCreateJobAdvert(createJobAdvertDTO, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a job advert
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jobsControllerDeleteJobAdvert(id: string, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.jobsControllerDeleteJobAdvert(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} [limit] 
         * @param {number} [offset] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jobsControllerFindAllJobAdvert(limit?: number, offset?: number, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.jobsControllerFindAllJobAdvert(limit, offset, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jobsControllerFindOneJobAdvert(id: string, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.jobsControllerFindOneJobAdvert(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Job Advert by Job ID
         * @param {string} jobId ID of the job to fetch the associated job advert
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jobsControllerGetJobAdvertByJobId(jobId: string, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.jobsControllerGetJobAdvertByJobId(jobId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a job advert
         * @param {string} id 
         * @param {UpdateJobAdvertDTO} updateJobAdvertDTO 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jobsControllerUpdateJobAdvert(id: string, updateJobAdvertDTO: UpdateJobAdvertDTO, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.jobsControllerUpdateJobAdvert(id, updateJobAdvertDTO, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * JobAdvertApi - object-oriented interface
 * @export
 * @class JobAdvertApi
 * @extends {BaseAPI}
 */
export class JobAdvertApi extends BaseAPI {
    /**
     * 
     * @param {CreateJobAdvertDTO} createJobAdvertDTO 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof JobAdvertApi
     */
    public jobsControllerCreateJobAdvert(createJobAdvertDTO: CreateJobAdvertDTO, options?: RawAxiosRequestConfig) {
        return JobAdvertApiFp(this.configuration).jobsControllerCreateJobAdvert(createJobAdvertDTO, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a job advert
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof JobAdvertApi
     */
    public jobsControllerDeleteJobAdvert(id: string, options?: RawAxiosRequestConfig) {
        return JobAdvertApiFp(this.configuration).jobsControllerDeleteJobAdvert(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof JobAdvertApi
     */
    public jobsControllerFindAllJobAdvert(limit?: number, offset?: number, options?: RawAxiosRequestConfig) {
        return JobAdvertApiFp(this.configuration).jobsControllerFindAllJobAdvert(limit, offset, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof JobAdvertApi
     */
    public jobsControllerFindOneJobAdvert(id: string, options?: RawAxiosRequestConfig) {
        return JobAdvertApiFp(this.configuration).jobsControllerFindOneJobAdvert(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Job Advert by Job ID
     * @param {string} jobId ID of the job to fetch the associated job advert
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof JobAdvertApi
     */
    public jobsControllerGetJobAdvertByJobId(jobId: string, options?: RawAxiosRequestConfig) {
        return JobAdvertApiFp(this.configuration).jobsControllerGetJobAdvertByJobId(jobId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a job advert
     * @param {string} id 
     * @param {UpdateJobAdvertDTO} updateJobAdvertDTO 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof JobAdvertApi
     */
    public jobsControllerUpdateJobAdvert(id: string, updateJobAdvertDTO: UpdateJobAdvertDTO, options?: RawAxiosRequestConfig) {
        return JobAdvertApiFp(this.configuration).jobsControllerUpdateJobAdvert(id, updateJobAdvertDTO, options).then((request) => request(this.axios, this.basePath));
    }
}

