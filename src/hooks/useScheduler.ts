import { useEffect, useRef, useState } from 'react';
import { generateUniqueId } from '@utils/generateUniqueId';

/**
 * Custom hook for scheduling jobs at a specified interval.
 *
 * @param interval - The interval (in milliseconds) at which the job should be executed.
 * @returns An object containing functions to schedule, update, stop, and restart the job, as well as the current job ID.
 */
export const useScheduler = (interval: number) => {
  const [isActive, setIsActive] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const fnRef = useRef<() => void>();
  const jobIdRef = useRef<string | null>(null);

  /**
   * Schedules a job to be executed at the specified interval.
   * @param fn The function to be executed as the job.
   */
  const scheduleJob = (fn: () => void) => {
    fnRef.current = fn;
    jobIdRef.current = generateUniqueId();
    setIsActive(true);
  };

  /**
   * Updates the job function to be executed.
   * @param fn The updated function to be executed as the job.
   */
  const updateJob = (fn: () => void) => {
    fnRef.current = fn;
  };

  /**
   * Stops the scheduler and clears the interval for the scheduled job.
   */
  const stopScheduler = () => {
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    setIsActive(false);
  };

  /**
   * Restarts the scheduler and resumes the scheduled job.
   */
  const restartScheduler = () => {
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
