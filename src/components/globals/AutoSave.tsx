import { FormControlLabel, Switch } from '@mui/material';
import { useStore } from '@store';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { useScheduler } from 'src/hooks/useScheduler';
import SavingProgress from './SavingProgress';

export default function AutoSave() {
  const { files } = useStore();
  const [isAutoSave, setAutoSave] = useLocalStorage<boolean>('autoSave', false);
  const [_, setSavedFiles] = useLocalStorage('files', files);
  const { scheduleJob, jobId, updateJob, stopScheduler, restartScheduler } = useScheduler(10000);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isAutoSave && !jobId) {
      scheduleJob(() => {
        setIsSaving(true);
        setSavedFiles(files);
      });
    }
  }, [isAutoSave, files, jobId, scheduleJob, setSavedFiles]);

  useEffect(() => {
    updateJob(() => {
      setIsSaving(true);
      setSavedFiles(files);
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
