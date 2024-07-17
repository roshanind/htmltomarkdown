import { useEffect, useRef, useState } from 'react';
import generateUniqueId from '@utils/generateUniqueId';

export const useScheduler = (interval: number) => {
  const [isActive, setIsActive] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const fnRef = useRef<() => void>();
  const jobIdRef = useRef<string | null>(null);

  const scheduleJob = (fn: () => void) => {
    fnRef.current = fn;
    jobIdRef.current = generateUniqueId();
    setIsActive(true);
  };

  const updateJob = (fn: () => void) => {
    fnRef.current = fn;
  };

  const stopScheduler = () => {
    // Clear the interval to stop the scheduled job
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    setIsActive(false);
  };

  const restartScheduler = () => {
    // Restart the scheduled job
    setIsActive(true);
  };

  useEffect(() => {
    if (isActive) {
      intervalIdRef.current = setInterval(() => {
        fnRef.current?.();
      }, interval);
    } else {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    }

    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, [isActive, interval]);

  return { scheduleJob, updateJob, stopScheduler, restartScheduler, jobId: jobIdRef.current };
};
