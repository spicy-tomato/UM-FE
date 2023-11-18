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

export type AddStudentsData = UMApplicationCommonModelsResultSystemBoolean;

export type ApproveData = UMApplicationCommonModelsResultSystemBoolean;

export type AssignToManagementClassesData = UMApplicationCommonModelsResultSystemBoolean;

export type AssignToStudentsData = UMApplicationCommonModelsResultSystemBoolean;

export type AssignToTeacherData = UMApplicationCommonModelsResultSystemBoolean;

export type CreateChangeRequestData =
  UMApplicationCommonModelsResultUMApplicationChangeSessionRequestQueriesGetByIdGetByIdDto;

export type DeleteCourseClassData = UMApplicationCommonModelsResultSystemBoolean;

export type DeleteCourseData = UMApplicationCommonModelsResultSystemBoolean;

export type DeleteManagementClassData = UMApplicationCommonModelsResultSystemBoolean;

export type DeleteProgramData = UMApplicationCommonModelsResultSystemBoolean;

export type DenyData = UMApplicationCommonModelsResultSystemBoolean;

export type GetAcademicYearData = UMApplicationCommonModelsResultSystemString;

export type GetAccountByIdData = UMApplicationCommonModelsResultUMApplicationAccountQueriesGetByIdGetByIdDto;

export type GetAllChangeRequestData =
  UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMApplicationChangeSessionRequestQueriesGetAllGetAllDto;

export interface GetAllChangeRequestParams {
  /** @format int32 */
  Status?: number;
}

export type GetChangeRequestByIdData =
  UMApplicationCommonModelsResultUMApplicationChangeSessionRequestQueriesGetByIdGetByIdDto;

export type GetCourseByIdData = UMApplicationCommonModelsResultUMApplicationCourseQueriesGetByIdGetByIdDto;

export type GetCourseClassData =
  UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMDomainDtosCourseClassICourseClass;

export interface GetCourseClassParams {
  AcademicYear?: string;
  /** @format int32 */
  Status?: number;
}

export type GetCourseData =
  UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMApplicationCourseQueriesGetAllGetAllDto;

export type GetCoursecClassByIdData = UMApplicationCommonModelsResultUMApplicationCourseClassQueriesGetByIdGetByIdDto;

export type GetManagementClassByIdData =
  UMApplicationCommonModelsResultUMApplicationManagementClassQueriesGetByIdGetByIdDto;

export type GetManagementClassData =
  UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMApplicationManagementClassQueriesGetAllGetAllDto;

export interface GetManagementClassParams {
  AcademicYear?: string;
}

export type GetMyScoresData =
  UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMApplicationStudentQueriesGetScoresGetScoresDto;

export type GetMySummaryInfoData = UMApplicationCommonModelsResultUMApplicationAuthQueriesMySummaryInfoMySummaryInfoDto;

export type GetProgramByIdData = UMApplicationCommonModelsResultUMApplicationProgramQueriesGetByIdGetByIdDto;

export type GetProgramData =
  UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMApplicationProgramQueriesGetAllGetAllDto;

export type GetRecommendationsData = UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableSystemString;

export type GetScoresData =
  UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMApplicationCourseClassQueriesGetScoresGetScoresDto;

export type GetSessionData =
  UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMApplicationSessionQueriesGetAllGetAllDto;

export interface GetSessionParams {
  /** @format date-time */
  Date?: string;
  /** @format date-time */
  MaxDate?: string;
  /** @format date-time */
  MinDate?: string;
  /** @format int32 */
  Slot?: number;
}

export type GetStudentData =
  UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMApplicationStudentQueriesGetScoresGetScoresDto;

export type ImportData = UMApplicationCommonModelsResultSystemBoolean;

export type LoginData = UMApplicationCommonModelsResultUMDomainDtosGeneratedToken;

export type PatchAccountData = UMApplicationCommonModelsResultUMApplicationAccountQueriesGetByIdGetByIdDto;

export type PostCourseClassData = UMApplicationCommonModelsResultSystemBoolean;

export type PostCourseData = UMApplicationCommonModelsResultUMApplicationCourseQueriesGetByIdGetByIdDto;

export type PostManagementClassData = UMApplicationCommonModelsResultSystemBoolean;

export type PostProgramData = UMApplicationCommonModelsResultUMApplicationProgramQueriesGetByIdGetByIdDto;

export type PostTeacherData = UMApplicationCommonModelsResultUMApplicationAccountQueriesGetByIdGetByIdDto;

export type PutAcademicYearData = UMApplicationCommonModelsResultSystemBoolean;

export type PutCourseClassData = UMApplicationCommonModelsResultSystemBoolean;

export type PutCourseData = UMApplicationCommonModelsResultSystemBoolean;

export type PutManagementClassData = UMApplicationCommonModelsResultSystemBoolean;

export type PutProgramData = UMApplicationCommonModelsResultSystemBoolean;

/**
 *
 *
 * 0 = Sunday
 *
 * 1 = Monday
 *
 * 2 = Tuesday
 *
 * 3 = Wednesday
 *
 * 4 = Thursday
 *
 * 5 = Friday
 *
 * 6 = Saturday
 * @format int32
 */
export enum SystemDayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

/**
 *
 *
 * 100 = Continue
 *
 * 101 = SwitchingProtocols
 *
 * 102 = Processing
 *
 * 103 = EarlyHints
 *
 * 200 = OK
 *
 * 201 = Created
 *
 * 202 = Accepted
 *
 * 203 = NonAuthoritativeInformation
 *
 * 204 = NoContent
 *
 * 205 = ResetContent
 *
 * 206 = PartialContent
 *
 * 207 = MultiStatus
 *
 * 208 = AlreadyReported
 *
 * 226 = IMUsed
 *
 * 300 = Ambiguous
 *
 * 301 = Moved
 *
 * 302 = Redirect
 *
 * 303 = RedirectMethod
 *
 * 304 = NotModified
 *
 * 305 = UseProxy
 *
 * 306 = Unused
 *
 * 307 = RedirectKeepVerb
 *
 * 308 = PermanentRedirect
 *
 * 400 = BadRequest
 *
 * 401 = Unauthorized
 *
 * 402 = PaymentRequired
 *
 * 403 = Forbidden
 *
 * 404 = NotFound
 *
 * 405 = MethodNotAllowed
 *
 * 406 = NotAcceptable
 *
 * 407 = ProxyAuthenticationRequired
 *
 * 408 = RequestTimeout
 *
 * 409 = Conflict
 *
 * 410 = Gone
 *
 * 411 = LengthRequired
 *
 * 412 = PreconditionFailed
 *
 * 413 = RequestEntityTooLarge
 *
 * 414 = RequestUriTooLong
 *
 * 415 = UnsupportedMediaType
 *
 * 416 = RequestedRangeNotSatisfiable
 *
 * 417 = ExpectationFailed
 *
 * 421 = MisdirectedRequest
 *
 * 422 = UnprocessableEntity
 *
 * 423 = Locked
 *
 * 424 = FailedDependency
 *
 * 426 = UpgradeRequired
 *
 * 428 = PreconditionRequired
 *
 * 429 = TooManyRequests
 *
 * 431 = RequestHeaderFieldsTooLarge
 *
 * 451 = UnavailableForLegalReasons
 *
 * 500 = InternalServerError
 *
 * 501 = NotImplemented
 *
 * 502 = BadGateway
 *
 * 503 = ServiceUnavailable
 *
 * 504 = GatewayTimeout
 *
 * 505 = HttpVersionNotSupported
 *
 * 506 = VariantAlsoNegotiates
 *
 * 507 = InsufficientStorage
 *
 * 508 = LoopDetected
 *
 * 510 = NotExtended
 *
 * 511 = NetworkAuthenticationRequired
 * @format int32
 */
export enum SystemNetHttpStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  EarlyHints = 103,
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  IMUsed = 226,
  Ambiguous = 300,
  Moved = 301,
  Redirect = 302,
  RedirectMethod = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  RedirectKeepVerb = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  RequestEntityTooLarge = 413,
  RequestUriTooLong = 414,
  UnsupportedMediaType = 415,
  RequestedRangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,
}

export interface UMApplicationAcademicYearCommandsUpdateCurrentUpdateCurrentCommand {
  academicYear?: string | null;
}

export interface UMApplicationAccountQueriesGetByIdGetByIdDto {
  address?: string | null;
  firstName?: string | null;
  /** @format uuid */
  id?: string;
  isMale?: boolean | null;
  lastName?: string | null;
  middleName?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}

export interface UMApplicationAuthCommandsLoginLoginCommand {
  password?: string | null;
  userName?: string | null;
}

export interface UMApplicationAuthCommandsUpdateMyInfoUpdateMyInfoCommand {
  address?: string | null;
  phoneNumber?: string | null;
}

export interface UMApplicationAuthQueriesMySummaryInfoMySummaryInfoDto {
  address?: string | null;
  firstName?: string | null;
  /** @format uuid */
  id?: string;
  isMale?: boolean | null;
  lastName?: string | null;
  middleName?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
}

export interface UMApplicationChangeSessionRequestCommandsCreateCreateCommandData {
  /** @format date-time */
  date?: string;
  /** @format int32 */
  slot?: number;
}

export interface UMApplicationChangeSessionRequestQueriesGetAllGetAllDto {
  /** @format uuid */
  id?: string;
  /** @format date-time */
  newEndAt?: string;
  /** @format int32 */
  newSlot?: number;
  /** @format date-time */
  newStartAt?: string;
  /** @format date-time */
  oldEndAt?: string;
  /** @format int32 */
  oldSlot?: number;
  /** @format date-time */
  oldStartAt?: string;
  session?: UMApplicationChangeSessionRequestQueriesGetAllGetByIdDtoSession;
  /**
   *
   *
   * 1 = Active
   *
   * 2 = Approved
   *
   * 4 = Denied
   */
  status?: UMDomainEnumsChangeSessionRequestEChangeSessionRequestStatus;
}

export interface UMApplicationChangeSessionRequestQueriesGetAllGetByIdDtoCourseClass {
  academicYear?: string | null;
  name?: string | null;
  teacher?: UMApplicationChangeSessionRequestQueriesGetAllGetByIdDtoTeacher;
}

export interface UMApplicationChangeSessionRequestQueriesGetAllGetByIdDtoSession {
  courseClass?: UMApplicationChangeSessionRequestQueriesGetAllGetByIdDtoCourseClass;
  /** @format uuid */
  id?: string;
}

export interface UMApplicationChangeSessionRequestQueriesGetAllGetByIdDtoTeacher {
  firstName?: string | null;
  /** @format uuid */
  id?: string;
  isMale?: boolean;
  lastName?: string | null;
  middleName?: string | null;
  teacherId?: string | null;
}

export interface UMApplicationChangeSessionRequestQueriesGetByIdGetByIdDto {
  /** @format uuid */
  id?: string;
  /** @format date-time */
  newEndAt?: string;
  /** @format int32 */
  newSlot?: number;
  /** @format date-time */
  newStartAt?: string;
  /** @format date-time */
  oldEndAt?: string;
  /** @format int32 */
  oldSlot?: number;
  /** @format date-time */
  oldStartAt?: string;
  session?: UMApplicationChangeSessionRequestQueriesGetByIdGetByIdDtoSession;
  /**
   *
   *
   * 1 = Active
   *
   * 2 = Approved
   *
   * 4 = Denied
   */
  status?: UMDomainEnumsChangeSessionRequestEChangeSessionRequestStatus;
}

export interface UMApplicationChangeSessionRequestQueriesGetByIdGetByIdDtoCourseClass {
  academicYear?: string | null;
  name?: string | null;
  teacher?: UMApplicationChangeSessionRequestQueriesGetByIdGetByIdDtoTeacher;
}

export interface UMApplicationChangeSessionRequestQueriesGetByIdGetByIdDtoSession {
  courseClass?: UMApplicationChangeSessionRequestQueriesGetByIdGetByIdDtoCourseClass;
  /** @format uuid */
  id?: string;
}

export interface UMApplicationChangeSessionRequestQueriesGetByIdGetByIdDtoTeacher {
  firstName?: string | null;
  /** @format uuid */
  id?: string;
  isMale?: boolean;
  lastName?: string | null;
  middleName?: string | null;
  teacherId?: string | null;
}

export interface UMApplicationCommonModelsError {
  /**
   *
   *
   * 100 = Continue
   *
   * 101 = SwitchingProtocols
   *
   * 102 = Processing
   *
   * 103 = EarlyHints
   *
   * 200 = OK
   *
   * 201 = Created
   *
   * 202 = Accepted
   *
   * 203 = NonAuthoritativeInformation
   *
   * 204 = NoContent
   *
   * 205 = ResetContent
   *
   * 206 = PartialContent
   *
   * 207 = MultiStatus
   *
   * 208 = AlreadyReported
   *
   * 226 = IMUsed
   *
   * 300 = Ambiguous
   *
   * 301 = Moved
   *
   * 302 = Redirect
   *
   * 303 = RedirectMethod
   *
   * 304 = NotModified
   *
   * 305 = UseProxy
   *
   * 306 = Unused
   *
   * 307 = RedirectKeepVerb
   *
   * 308 = PermanentRedirect
   *
   * 400 = BadRequest
   *
   * 401 = Unauthorized
   *
   * 402 = PaymentRequired
   *
   * 403 = Forbidden
   *
   * 404 = NotFound
   *
   * 405 = MethodNotAllowed
   *
   * 406 = NotAcceptable
   *
   * 407 = ProxyAuthenticationRequired
   *
   * 408 = RequestTimeout
   *
   * 409 = Conflict
   *
   * 410 = Gone
   *
   * 411 = LengthRequired
   *
   * 412 = PreconditionFailed
   *
   * 413 = RequestEntityTooLarge
   *
   * 414 = RequestUriTooLong
   *
   * 415 = UnsupportedMediaType
   *
   * 416 = RequestedRangeNotSatisfiable
   *
   * 417 = ExpectationFailed
   *
   * 421 = MisdirectedRequest
   *
   * 422 = UnprocessableEntity
   *
   * 423 = Locked
   *
   * 424 = FailedDependency
   *
   * 426 = UpgradeRequired
   *
   * 428 = PreconditionRequired
   *
   * 429 = TooManyRequests
   *
   * 431 = RequestHeaderFieldsTooLarge
   *
   * 451 = UnavailableForLegalReasons
   *
   * 500 = InternalServerError
   *
   * 501 = NotImplemented
   *
   * 502 = BadGateway
   *
   * 503 = ServiceUnavailable
   *
   * 504 = GatewayTimeout
   *
   * 505 = HttpVersionNotSupported
   *
   * 506 = VariantAlsoNegotiates
   *
   * 507 = InsufficientStorage
   *
   * 508 = LoopDetected
   *
   * 510 = NotExtended
   *
   * 511 = NetworkAuthenticationRequired
   */
  code?: SystemNetHttpStatusCode;
  message?: string | null;
  property?: string | null;
}

export interface UMApplicationCommonModelsResultSystemBoolean {
  data?: boolean;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableSystemString {
  data?: string[] | null;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMApplicationChangeSessionRequestQueriesGetAllGetAllDto {
  data?: UMApplicationChangeSessionRequestQueriesGetAllGetAllDto[] | null;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMApplicationCourseClassQueriesGetScoresGetScoresDto {
  data?: UMApplicationCourseClassQueriesGetScoresGetScoresDto[] | null;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMApplicationCourseQueriesGetAllGetAllDto {
  data?: UMApplicationCourseQueriesGetAllGetAllDto[] | null;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMApplicationManagementClassQueriesGetAllGetAllDto {
  data?: UMApplicationManagementClassQueriesGetAllGetAllDto[] | null;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMApplicationProgramQueriesGetAllGetAllDto {
  data?: UMApplicationProgramQueriesGetAllGetAllDto[] | null;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMApplicationSessionQueriesGetAllGetAllDto {
  data?: UMApplicationSessionQueriesGetAllGetAllDto[] | null;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMApplicationStudentQueriesGetScoresGetScoresDto {
  data?: UMApplicationStudentQueriesGetScoresGetScoresDto[] | null;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableUMDomainDtosCourseClassICourseClass {
  data?: UMDomainDtosCourseClassICourseClass[] | null;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultSystemString {
  data?: string | null;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultUMApplicationAccountQueriesGetByIdGetByIdDto {
  data?: UMApplicationAccountQueriesGetByIdGetByIdDto;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultUMApplicationAuthQueriesMySummaryInfoMySummaryInfoDto {
  data?: UMApplicationAuthQueriesMySummaryInfoMySummaryInfoDto;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultUMApplicationChangeSessionRequestQueriesGetByIdGetByIdDto {
  data?: UMApplicationChangeSessionRequestQueriesGetByIdGetByIdDto;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultUMApplicationCourseClassQueriesGetByIdGetByIdDto {
  data?: UMApplicationCourseClassQueriesGetByIdGetByIdDto;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultUMApplicationCourseQueriesGetByIdGetByIdDto {
  data?: UMApplicationCourseQueriesGetByIdGetByIdDto;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultUMApplicationManagementClassQueriesGetByIdGetByIdDto {
  data?: UMApplicationManagementClassQueriesGetByIdGetByIdDto;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultUMApplicationProgramQueriesGetByIdGetByIdDto {
  data?: UMApplicationProgramQueriesGetByIdGetByIdDto;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCommonModelsResultUMDomainDtosGeneratedToken {
  data?: UMDomainDtosGeneratedToken;
  errors?: UMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface UMApplicationCourseClassCommandsAssignToManagementClassesAssignToManagementClassesCommandData {
  managementClassesId?: string[] | null;
}

export interface UMApplicationCourseClassCommandsAssignToStudentsAssignToStudentsCommandData {
  studentsId?: string[] | null;
}

export interface UMApplicationCourseClassCommandsBulkCreateBulkCreateCommand {
  courseId?: string | null;
  /** @format int32 */
  numberOfClasses?: number;
  /** @format int32 */
  sessionsCount?: number;
  /** @format date-time */
  startAt?: string;
}

export interface UMApplicationCourseClassCommandsUpdateScoreUpdateScoreCommandData {
  /** @format double */
  score?: number;
}

export interface UMApplicationCourseClassCommandsUpdateUpdateCommandData {
  name?: string | null;
  /** @format int32 */
  sessionsCount?: number;
  slots?: string | null;
  /** @format date-time */
  startAt?: string;
  teacherId?: string | null;
}

export interface UMApplicationCourseClassQueriesGetByIdGetByIdDto {
  academicYear?: string | null;
  courseId?: string | null;
  /** @format uuid */
  id?: string;
  name?: string | null;
  sessions?: UMApplicationCourseClassQueriesGetByIdGetByIdDtoSession[] | null;
  /** @format int32 */
  sessionsCount?: number;
  slots?: UMApplicationCourseClassQueriesGetByIdGetByIdDtoSlot[] | null;
  /** @format date-time */
  startAt?: string;
  /** @format int32 */
  status?: number;
  teacher?: UMApplicationCourseClassQueriesGetByIdGetByIdDtoTeacher;
}

export interface UMApplicationCourseClassQueriesGetByIdGetByIdDtoSession {
  courseClass?: UMApplicationCourseClassQueriesGetByIdGetByIdDtoSlotCourseClass;
  /** @format date-time */
  endAt?: string;
  /** @format int32 */
  slot?: number;
  /** @format date-time */
  startAt?: string;
}

export interface UMApplicationCourseClassQueriesGetByIdGetByIdDtoSlot {
  /** @format int32 */
  daySlot?: number;
  /**
   *
   *
   * 0 = Sunday
   *
   * 1 = Monday
   *
   * 2 = Tuesday
   *
   * 3 = Wednesday
   *
   * 4 = Thursday
   *
   * 5 = Friday
   *
   * 6 = Saturday
   */
  weekDay?: SystemDayOfWeek;
}

export interface UMApplicationCourseClassQueriesGetByIdGetByIdDtoSlotCourseClass {
  academicYear?: string | null;
  name?: string | null;
}

export interface UMApplicationCourseClassQueriesGetByIdGetByIdDtoTeacher {
  firstName?: string | null;
  isMale?: boolean;
  lastName?: string | null;
  middleName?: string | null;
  teacherId?: string | null;
}

export interface UMApplicationCourseClassQueriesGetScoresGetScoresDto {
  letterScore?: string | null;
  /** @format double */
  score?: number | null;
  student?: UMApplicationCourseClassQueriesGetScoresGetScoresDtoStudent;
}

export interface UMApplicationCourseClassQueriesGetScoresGetScoresDtoManagementClass {
  academicYear?: string | null;
  /** @format uuid */
  id?: string;
  name?: string | null;
}

export interface UMApplicationCourseClassQueriesGetScoresGetScoresDtoStudent {
  firstName?: string | null;
  /** @format uuid */
  id?: string;
  isMale?: boolean;
  lastName?: string | null;
  managementClass?: UMApplicationCourseClassQueriesGetScoresGetScoresDtoManagementClass;
  middleName?: string | null;
  studentId?: string | null;
}

export interface UMApplicationCourseCommandsCreateCreateCommand {
  courseId?: string | null;
  name?: string | null;
  programs?: string[] | null;
}

export interface UMApplicationCourseCommandsUpdateUpdateCommandData {
  courseId?: string | null;
  name?: string | null;
}

export interface UMApplicationCourseQueriesGetAllGetAllDto {
  courseId?: string | null;
  /** @format uuid */
  id?: string;
  name?: string | null;
}

export interface UMApplicationCourseQueriesGetByIdGetByIdDto {
  courseClasses?: UMApplicationCourseQueriesGetByIdGetByIdDtoCourseClass[] | null;
  courseId?: string | null;
  /** @format uuid */
  id?: string;
  name?: string | null;
}

export interface UMApplicationCourseQueriesGetByIdGetByIdDtoCourseClass {
  academicYear?: string | null;
  /** @format uuid */
  id?: string;
  name?: string | null;
  /** @format int32 */
  sessionsCount?: number;
  /** @format date-time */
  startAt?: string;
  /** @format int32 */
  status?: number;
}

export interface UMApplicationManagementClassCommandsAddStudentsAddStudentsCommandData {
  studentsId?: string[] | null;
}

export interface UMApplicationManagementClassCommandsBulkCreateBulkCreateCommand {
  /** @format int32 */
  numberOfClasses?: number;
  programId?: string | null;
}

export interface UMApplicationManagementClassCommandsUpdateUpdateCommandData {
  name?: string | null;
}

export interface UMApplicationManagementClassQueriesGetAllGetAllDto {
  /** @format uuid */
  id?: string;
  name?: string | null;
}

export interface UMApplicationManagementClassQueriesGetByIdGetByIdDto {
  academicYear?: string | null;
  /** @format uuid */
  id?: string;
  name?: string | null;
  students?: UMApplicationManagementClassQueriesGetByIdGetByIdDtoStudent[] | null;
}

export interface UMApplicationManagementClassQueriesGetByIdGetByIdDtoStudent {
  firstName?: string | null;
  /** @format uuid */
  id?: string;
  isMale?: boolean;
  lastName?: string | null;
  middleName?: string | null;
  studentId?: string | null;
}

export interface UMApplicationProgramCommandsCreateCreateCommand {
  name?: string | null;
  programId?: string | null;
}

export interface UMApplicationProgramCommandsUpdateUpdateCommandData {
  name?: string | null;
  programId?: string | null;
}

export interface UMApplicationProgramQueriesGetAllGetAllDto {
  /** @format uuid */
  id?: string;
  name?: string | null;
  programId?: string | null;
}

export interface UMApplicationProgramQueriesGetByIdGetByIdDto {
  courses?: UMApplicationProgramQueriesGetByIdGetByIdDtoCourse[] | null;
  /** @format uuid */
  id?: string;
  name?: string | null;
}

export interface UMApplicationProgramQueriesGetByIdGetByIdDtoCourse {
  courseId?: string | null;
  /** @format uuid */
  id?: string;
  name?: string | null;
  programId?: string | null;
}

export interface UMApplicationSessionQueriesGetAllGetAllDto {
  courseClass?: UMApplicationSessionQueriesGetAllGetAllDtoCourseClass;
  /** @format date-time */
  endAt?: string;
  /** @format uuid */
  id?: string;
  /** @format int32 */
  slot?: number;
  /** @format date-time */
  startAt?: string;
}

export interface UMApplicationSessionQueriesGetAllGetAllDtoCourse {
  courseId?: string | null;
  /** @format uuid */
  id?: string;
  name?: string | null;
}

export interface UMApplicationSessionQueriesGetAllGetAllDtoCourseClass {
  course?: UMApplicationSessionQueriesGetAllGetAllDtoCourse;
  /** @format uuid */
  id?: string;
  name?: string | null;
}

export interface UMApplicationStudentQueriesGetScoresGetScoresDto {
  courseClass?: UMApplicationStudentQueriesGetScoresGetScoresDtoCourseClass;
  letterScore?: string | null;
  /** @format double */
  score?: number | null;
}

export interface UMApplicationStudentQueriesGetScoresGetScoresDtoCourse {
  courseId?: string | null;
  /** @format uuid */
  id?: string;
  name?: string | null;
}

export interface UMApplicationStudentQueriesGetScoresGetScoresDtoCourseClass {
  course?: UMApplicationStudentQueriesGetScoresGetScoresDtoCourse;
  /** @format uuid */
  id?: string;
  name?: string | null;
  /** @format int32 */
  sessionsCount?: number;
  /**
   *
   *
   * 1 = Draft
   *
   * 2 = Active
   *
   * 4 = Finished
   */
  status?: UMDomainEnumsCourseClassECourseClassStatus;
  teacher?: UMApplicationStudentQueriesGetScoresGetScoresDtoTeacher;
}

export interface UMApplicationStudentQueriesGetScoresGetScoresDtoTeacher {
  firstName?: string | null;
  isMale?: boolean;
  lastName?: string | null;
  middleName?: string | null;
  teacherId?: string | null;
}

export interface UMApplicationTeacherCommandsCreateCreateCommand {
  address?: string | null;
  email?: string | null;
  firstName?: string | null;
  isMale?: boolean;
  lastName?: string | null;
  middleName?: string | null;
  teacherId?: string | null;
  userName?: string | null;
}

export type UMDomainDtosCourseClassICourseClass = object;

export interface UMDomainDtosGeneratedToken {
  /** @format date-time */
  expiration?: string;
  token?: string | null;
}

/**
 *
 *
 * 1 = Active
 *
 * 2 = Approved
 *
 * 4 = Denied
 * @format int32
 */
export enum UMDomainEnumsChangeSessionRequestEChangeSessionRequestStatus {
  Active = 1,
  Approved = 2,
  Denied = 4,
}

/**
 *
 *
 * 1 = Draft
 *
 * 2 = Active
 *
 * 4 = Finished
 * @format int32
 */
export enum UMDomainEnumsCourseClassECourseClassStatus {
  Draft = 1,
  Active = 2,
  Finished = 4,
}

export type UpdateInformationData = UMApplicationCommonModelsResultSystemBoolean;

export type UpdateScoreData = UMApplicationCommonModelsResultSystemBoolean;
