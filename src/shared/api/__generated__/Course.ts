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

import {
  DeleteCourseData,
  GetCourseByIdData,
  GetCourseData,
  PostCourseData,
  PutCourseData,
  UMApplicationCourseCommandsCreateCreateCommand,
  UMApplicationCourseCommandsUpdateUpdateCommandData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Course<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Course
   * @name GetCourse
   * @request GET:/Course
   * @response `200` `GetCourseData` Success
   */
  getCourse = (params: RequestParams = {}) =>
    this.request<GetCourseData, any>({
      path: `/Course`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Course
   * @name PostCourse
   * @request POST:/Course
   * @response `200` `PostCourseData` Success
   */
  postCourse = (data: UMApplicationCourseCommandsCreateCreateCommand, params: RequestParams = {}) =>
    this.request<PostCourseData, any>({
      path: `/Course`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Course
   * @name GetCourseById
   * @request GET:/Course/{id}
   * @response `200` `GetCourseByIdData` Success
   */
  getCourseById = (id: string, params: RequestParams = {}) =>
    this.request<GetCourseByIdData, any>({
      path: `/Course/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Course
   * @name PutCourse
   * @request PUT:/Course/{id}
   * @response `200` `PutCourseData` Success
   */
  putCourse = (id: string, data: UMApplicationCourseCommandsUpdateUpdateCommandData, params: RequestParams = {}) =>
    this.request<PutCourseData, any>({
      path: `/Course/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Course
   * @name DeleteCourse
   * @request DELETE:/Course/{id}
   * @response `200` `DeleteCourseData` Success
   */
  deleteCourse = (id: string, params: RequestParams = {}) =>
    this.request<DeleteCourseData, any>({
      path: `/Course/${id}`,
      method: "DELETE",
      ...params,
    });
}
