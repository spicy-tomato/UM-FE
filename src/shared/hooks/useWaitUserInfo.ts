import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export function useWaitUserInfo(callback?: () => Promise<void>) {
  const user = useSelector((store: RootState) => store.auth.user);

  useEffect(() => {
    if (user) {
      callback?.();
    }
  }, [user?.id]);

  return user;
}
