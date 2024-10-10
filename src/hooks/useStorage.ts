import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setItem, removeItem } from '../utils/redux/storageSlice';
import { useMemo } from 'react';
import { RootState } from '../utils/redux/redux-persist';

type UseStorageReturnType<T> = [T, (value: T) => void, () => void];

function useStorage<T>(key: string, initialValue: T): UseStorageReturnType<T> {
  const dispatch = useDispatch();

  // Access the value from Redux state, and use initial value if not found
  const storedValue = useSelector((state: RootState) => state.storage[key]) ?? initialValue;

  // Memoize the setValue function to avoid unnecessary re-renders
  const setValue = useCallback(
    (value: T) => {
      dispatch(setItem({ key, value }));
    },
    [dispatch, key]
  );

  // Memoize the removeValue function
  const removeValue = useCallback(() => {
    dispatch(removeItem({ key }));
  }, [dispatch, key]);

  return useMemo(() => [storedValue, setValue, removeValue], [storedValue, setValue, removeValue]);
}

export default useStorage;
