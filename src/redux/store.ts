import { configureStore } from '@reduxjs/toolkit';
import authReducer from './feature/authSlice';
import courseClassDetailsReducer from './feature/courseClassDetailsSlice';
import { AuthState } from './states/authState';
import { CourseClassDetailsState } from './states/courseClassDetailsState';
import { courseClassDetailsMiddleware } from './middlewares/courseClassDetailsMiddleware';
import { authMiddleware } from './middlewares/authMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courseClassDetails: courseClassDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      courseClassDetailsMiddleware.middleware,
      authMiddleware.middleware
    ),
});

export type RootState = ReturnType<
  () => {
    auth: AuthState;
    courseClassDetails: CourseClassDetailsState;
  }
>;
