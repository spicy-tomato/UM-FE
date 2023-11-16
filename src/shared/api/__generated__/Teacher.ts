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

import { PostTeacherData, UMApplicationTeacherCommandsCreateCreateCommand } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Teacher<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Teacher
   * @name PostTeacher
   * @request POST:/Teacher
   * @response `200` `PostTeacherData` Success
   */
  postTeacher = (data: UMApplicationTeacherCommandsCreateCreateCommand, params: RequestParams = {}) =>
    this.request<PostTeacherData, any>({
      path: `/Teacher`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
