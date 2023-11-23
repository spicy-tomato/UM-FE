import { UMApplicationCourseClassQueriesGetByIdGetByIdDto } from '@api';
import { SelectItemType } from '@models';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CourseClassDetailsState } from '../states/courseClassDetailsState';

const initialState: CourseClassDetailsState = {
  courseClass: null,
  managementClassOptions: [],
  studentOptions: [],
  teacherOptions: [],
};

export const courseClassDetailsSlice = createSlice({
  name: 'courseClassDetails',
  initialState,
  reducers: {
    courseClassDetailsUpdateCourseClass: (
      state,
      actions: PayloadAction<UMApplicationCourseClassQueriesGetByIdGetByIdDto>
    ) => {
      state.courseClass = actions.payload;
    },
    courseClassDetailsUpdateManagementClassOptions: (
      state,
      actions: PayloadAction<SelectItemType[]>
    ) => {
      state.managementClassOptions = actions.payload;
    },
    courseClassDetailsUpdateStudentOptions: (
      state,
      actions: PayloadAction<SelectItemType[]>
    ) => {
      state.studentOptions = actions.payload;
    },
    courseClassDetailsUpdateTeacherOptions: (
      state,
      actions: PayloadAction<SelectItemType[]>
    ) => {
      state.teacherOptions = actions.payload;
    },
  },
});

export const {
  courseClassDetailsUpdateCourseClass,
  courseClassDetailsUpdateManagementClassOptions,
  courseClassDetailsUpdateStudentOptions,
  courseClassDetailsUpdateTeacherOptions,
} = courseClassDetailsSlice.actions;

export default courseClassDetailsSlice.reducer;
