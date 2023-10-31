import { CircularProgress, CircularProgressProps } from '@mui/material';

interface ProgressProps extends CircularProgressProps {
  size?: number;
  thickness?: number;
}

const Progress: React.FC<ProgressProps> = ({ size = 30, thickness = 3.6 }) => {
  return <CircularProgress size={size} thickness={thickness} />;
};

export default Progress;
