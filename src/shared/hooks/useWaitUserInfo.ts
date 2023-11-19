import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export function useWaitUserInfo(callback?: Function) {
  const user = useSelector((store: RootState) => store.auth.user);

  useEffect(() => {
    if (user) {
      let ignore = false;

      callback?.();

      return () => {
        ignore = true;
      };
    }
  }, [user]);

  return user;
}
