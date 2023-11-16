/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { GetAccountByIdData, GetAccountData, PatchAccountData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Account<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Account
   * @name GetAccount
   * @request GET:/Account/score
   * @response `200` `GetAccountData` Success
   */
  getAccount = (params: RequestParams = {}) =>
    this.request<GetAccountData, any>({
      path: `/Account/score`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name GetAccountById
   * @request GET:/Account/{userId}
   * @response `200` `GetAccountByIdData` Success
   */
  getAccountById = (userId: string, params: RequestParams = {}) =>
    this.request<GetAccountByIdData, any>({
      path: `/Account/${userId}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name PatchAccount
   * @request PATCH:/Account/{userId}
   * @response `200` `PatchAccountData` Success
   */
  patchAccount = (userId: string, params: RequestParams = {}) =>
    this.request<PatchAccountData, any>({
      path: `/Account/${userId}`,
      method: "PATCH",
      ...params,
    });
}
