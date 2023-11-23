import { UMApplicationCourseClassQueriesGetByIdGetByIdDto } from '@api';
import { SelectItemType } from '@models';

export type CourseClassDetailsState = {
  courseClass: UMApplicationCourseClassQueriesGetByIdGetByIdDto | null;
  managementClassOptions: readonly SelectItemType[];
  studentOptions: readonly SelectItemType[];
  teacherOptions: readonly SelectItemType[];
};
