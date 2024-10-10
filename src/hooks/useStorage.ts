import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setItem, removeItem } from '../utils/redux/storageSlice';
import { RootState } from '../utils/redux/store';

type UseStorageReturnType<T> = [T, (value: T) => void, () => void];

function useStorage<T>(key: string, initialValue: T): UseStorageReturnType<T> {
  const dispatch = useDispatch();
  
  // Access the value from Redux state
  const storedValue = useSelector((state: RootState) => state.storage[key]) ?? initialValue;

  // Set a new value
  const setValue = useCallback((value: T) => {
    dispatch(setItem({ key, value }));
  }, [dispatch, key]);

  // Remove the value
  const removeValue = useCallback(() => {
    dispatch(removeItem({ key }));
  }, [dispatch, key]);

  return [storedValue, setValue, removeValue];
}

export default useStorage;
