import { Box, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

type Props = {
  isShow: boolean;
  interval?: number;
  onEnd?: () => void;
};

export default function SavingProgress({ isShow, interval = 5000, onEnd }: Props) {
  const [showProgress, setShowProgress] = useState(isShow);

  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isShow) {
      setShowProgress(true);
      timerRef.current = setTimeout(() => {
        onEnd?.();
        setShowProgress(false);
      }, interval);
    } else {
      setShowProgress(false);
    }
  }, [isShow, interval, onEnd]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        onEnd?.();
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      {showProgress && (
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
          <CircularProgress size={16} />
          <span style={{ position: 'relative', top: 1 }}>Saving</span>
        </Box>
      )}
    </>
  );
}
