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
import type { CreateAgencyDto } from '../models';
// @ts-ignore
import type { UpdateAgencyDto } from '../models';
/**
 * AgencyApi - axios parameter creator
 * @export
 */
export const AgencyApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new agency
         * @param {CreateAgencyDto} createAgencyDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyControllerCreateAgency: async (createAgencyDto: CreateAgencyDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createAgencyDto' is not null or undefined
            assertParamExists('agencyControllerCreateAgency', 'createAgencyDto', createAgencyDto)
            const localVarPath = `/v1/agency`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createAgencyDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary This will delete Agency record on the basis of ID
         * @param {string} id Agency ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyControllerDeleteAgency: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('agencyControllerDeleteAgency', 'id', id)
            const localVarPath = `/v1/agency/{id}`
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
         * @summary Find list of agencies
         * @param {number} [limit] 
         * @param {number} [offset] 
         * @param {string} [name] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyControllerFindAllAgencies: async (limit?: number, offset?: number, name?: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/agency`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }

            if (offset !== undefined) {
                localVarQueryParameter['offset'] = offset;
            }

            if (name !== undefined) {
                localVarQueryParameter['name'] = name;
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
         * @summary This will fetch Agency record on the basis of ID
         * @param {string} id Agency ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyControllerFindOneAgency: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('agencyControllerFindOneAgency', 'id', id)
            const localVarPath = `/v1/agency/{id}`
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
         * @summary This endpoint will update agency
         * @param {string} id Agency ID
         * @param {UpdateAgencyDto} updateAgencyDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyControllerUpdateAgency: async (id: string, updateAgencyDto: UpdateAgencyDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('agencyControllerUpdateAgency', 'id', id)
            // verify required parameter 'updateAgencyDto' is not null or undefined
            assertParamExists('agencyControllerUpdateAgency', 'updateAgencyDto', updateAgencyDto)
            const localVarPath = `/v1/agency/{id}`
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


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateAgencyDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AgencyApi - functional programming interface
 * @export
 */
export const AgencyApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AgencyApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new agency
         * @param {CreateAgencyDto} createAgencyDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async agencyControllerCreateAgency(createAgencyDto: CreateAgencyDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.agencyControllerCreateAgency(createAgencyDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AgencyApi.agencyControllerCreateAgency']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary This will delete Agency record on the basis of ID
         * @param {string} id Agency ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async agencyControllerDeleteAgency(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.agencyControllerDeleteAgency(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AgencyApi.agencyControllerDeleteAgency']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Find list of agencies
         * @param {number} [limit] 
         * @param {number} [offset] 
         * @param {string} [name] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async agencyControllerFindAllAgencies(limit?: number, offset?: number, name?: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.agencyControllerFindAllAgencies(limit, offset, name, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AgencyApi.agencyControllerFindAllAgencies']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary This will fetch Agency record on the basis of ID
         * @param {string} id Agency ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async agencyControllerFindOneAgency(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.agencyControllerFindOneAgency(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AgencyApi.agencyControllerFindOneAgency']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary This endpoint will update agency
         * @param {string} id Agency ID
         * @param {UpdateAgencyDto} updateAgencyDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async agencyControllerUpdateAgency(id: string, updateAgencyDto: UpdateAgencyDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.agencyControllerUpdateAgency(id, updateAgencyDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AgencyApi.agencyControllerUpdateAgency']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * AgencyApi - factory interface
 * @export
 */
export const AgencyApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AgencyApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new agency
         * @param {CreateAgencyDto} createAgencyDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyControllerCreateAgency(createAgencyDto: CreateAgencyDto, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.agencyControllerCreateAgency(createAgencyDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary This will delete Agency record on the basis of ID
         * @param {string} id Agency ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyControllerDeleteAgency(id: string, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.agencyControllerDeleteAgency(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Find list of agencies
         * @param {number} [limit] 
         * @param {number} [offset] 
         * @param {string} [name] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyControllerFindAllAgencies(limit?: number, offset?: number, name?: string, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.agencyControllerFindAllAgencies(limit, offset, name, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary This will fetch Agency record on the basis of ID
         * @param {string} id Agency ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyControllerFindOneAgency(id: string, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.agencyControllerFindOneAgency(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary This endpoint will update agency
         * @param {string} id Agency ID
         * @param {UpdateAgencyDto} updateAgencyDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyControllerUpdateAgency(id: string, updateAgencyDto: UpdateAgencyDto, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.agencyControllerUpdateAgency(id, updateAgencyDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AgencyApi - object-oriented interface
 * @export
 * @class AgencyApi
 * @extends {BaseAPI}
 */
export class AgencyApi extends BaseAPI {
    /**
     * 
     * @summary Create a new agency
     * @param {CreateAgencyDto} createAgencyDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AgencyApi
     */
    public agencyControllerCreateAgency(createAgencyDto: CreateAgencyDto, options?: RawAxiosRequestConfig) {
        return AgencyApiFp(this.configuration).agencyControllerCreateAgency(createAgencyDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary This will delete Agency record on the basis of ID
     * @param {string} id Agency ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AgencyApi
     */
    public agencyControllerDeleteAgency(id: string, options?: RawAxiosRequestConfig) {
        return AgencyApiFp(this.configuration).agencyControllerDeleteAgency(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Find list of agencies
     * @param {number} [limit] 
     * @param {number} [offset] 
     * @param {string} [name] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AgencyApi
     */
    public agencyControllerFindAllAgencies(limit?: number, offset?: number, name?: string, options?: RawAxiosRequestConfig) {
        return AgencyApiFp(this.configuration).agencyControllerFindAllAgencies(limit, offset, name, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary This will fetch Agency record on the basis of ID
     * @param {string} id Agency ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AgencyApi
     */
    public agencyControllerFindOneAgency(id: string, options?: RawAxiosRequestConfig) {
        return AgencyApiFp(this.configuration).agencyControllerFindOneAgency(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary This endpoint will update agency
     * @param {string} id Agency ID
     * @param {UpdateAgencyDto} updateAgencyDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AgencyApi
     */
    public agencyControllerUpdateAgency(id: string, updateAgencyDto: UpdateAgencyDto, options?: RawAxiosRequestConfig) {
        return AgencyApiFp(this.configuration).agencyControllerUpdateAgency(id, updateAgencyDto, options).then((request) => request(this.axios, this.basePath));
    }
}

