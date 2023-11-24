import { configureStore } from '@reduxjs/toolkit';
import authReducer from './feature/authSlice';
import courseClassDetailsReducer from './feature/courseClassDetailsSlice';
import courseClassListReducer from './feature/courseClassListSlice';
import {
  authMiddleware,
  courseClassDetailsMiddleware,
  courseClassListMiddleware,
} from './middlewares';
import {
  AuthState,
  CourseClassDetailsState,
  CourseClassListState,
} from './states';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courseClassDetails: courseClassDetailsReducer,
    courseClassList: courseClassListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      authMiddleware.middleware,
      courseClassDetailsMiddleware.middleware,
      courseClassListMiddleware.middleware
    ),
});

export type RootState = ReturnType<
  () => {
    auth: AuthState;
    courseClassDetails: CourseClassDetailsState;
    courseClassList: CourseClassListState;
  }
>;
