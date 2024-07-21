import { useEffect, useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';

import { useStore } from '@store';
import { AUTO_SAVE_CHECK_INTERVAL, AUTO_SAVE_KEY } from '@constants/index';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { useScheduler } from '@hooks/useScheduler';
import { useSaveFile } from '@hooks/useSaveFile';

import SavingProgress from './SavingProgress';

/**
 * AutoSave component handles automatic saving of files.
 * It provides a switch to enable/disable auto-saving functionality.
 *
 * @returns JSX.Element
 */
export default function AutoSave() {
  const { files } = useStore();
  const [isAutoSave, setAutoSave] = useLocalStorage<boolean>(AUTO_SAVE_KEY, false);
  const { saveAllFiles } = useSaveFile();
  const { scheduleJob, jobId, updateJob, stopScheduler, restartScheduler } = useScheduler(AUTO_SAVE_CHECK_INTERVAL);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isAutoSave && !jobId) {
      scheduleJob(() => {
        setIsSaving(true);
        saveAllFiles(files);
      });
    }
  }, [isAutoSave, files, jobId, scheduleJob, saveAllFiles]);

  useEffect(() => {
    updateJob(() => {
      setIsSaving(true);
      saveAllFiles(files);
    });
  }, [files]);

  useEffect(() => {
    if (!isAutoSave && jobId) {
      stopScheduler();
    } else if (isAutoSave && jobId) {
      restartScheduler();
    }
  }, [isAutoSave]);

  const handleOnAutoSaveEnable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutoSave(event.target.checked);
  };

  const handleOnProgressEnd = () => {
    setIsSaving(false);
  };

  return (
    <>
      <SavingProgress isShow={isSaving} onEnd={handleOnProgressEnd} />
      {!isSaving && (
        <FormControlLabel
          sx={{
            marginRight: 0,
            color: (theme) => theme.palette.common.white,
          }}
          control={
            <>
              <Switch size="small" checked={isAutoSave} onChange={handleOnAutoSaveEnable} />
            </>
          }
          label="Auto Save"
        />
      )}
    </>
  );
}
