import { configureStore } from '@reduxjs/toolkit';
import authReducer from './feature/authSlice';
import courseClassDetailsReducer from './feature/courseClassDetailsSlice';
import courseClassListReducer from './feature/courseClassListSlice';
import programListReducer from './feature/programListSlice';
import {
  authMiddleware,
  courseClassDetailsMiddleware,
  courseClassListMiddleware,
  programListMiddleware,
} from './middlewares';
import {
  AuthState,
  CourseClassDetailsState,
  CourseClassListState,
  ProgramListState,
} from './states';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courseClassDetails: courseClassDetailsReducer,
    courseClassList: courseClassListReducer,
    programList: programListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      authMiddleware.middleware,
      courseClassDetailsMiddleware.middleware,
      courseClassListMiddleware.middleware,
      programListMiddleware.middleware
    ),
});

export type RootState = ReturnType<
  () => {
    auth: AuthState;
    courseClassDetails: CourseClassDetailsState;
    courseClassList: CourseClassListState;
    programList: ProgramListState;
  }
>;
