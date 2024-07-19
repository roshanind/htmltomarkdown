import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';

type Props = {
  isShow: boolean;
  interval?: number;
  onEnd?: () => void;
};

/**
 * Renders a saving progress indicator.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isShow - Determines whether to show the progress indicator.
 * @param {number} [props.interval=3000] - The interval in milliseconds after which the progress indicator should be hidden.
 * @param {Function} props.onEnd - The callback function to be called when the progress indicator ends.
 * @returns {JSX.Element} The saving progress component.
 */
export default function SavingProgress({ isShow, interval = 3000, onEnd }: Props) {
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
