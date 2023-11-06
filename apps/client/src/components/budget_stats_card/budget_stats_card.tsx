import React, { FC, ReactNode, useEffect, useState } from 'react';
import {
  Typography,
  CircularProgress,
  Box,
  Fab,
  Input,
  IconButton,
} from '@mui/material';
import { formatAsCurrency } from '../../utils/currency';
import Card from '../common/card/card';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import styles from './budget_stats_card.module.scss';

interface BudgetStatsCardProps {
  isLoading: boolean;
  title: string;
  value: number;
  action?: boolean;
  error?: string | null;
  icon?: ReactNode;
  handleEditLimit?: (value: number) => void;
}

const BudgetStatsCard: FC<BudgetStatsCardProps> = ({
  isLoading,
  title,
  value,
  error,
  icon,
  action = false,
  handleEditLimit,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    handleEditLimit?.(editedValue);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedValue(value); // Reset the edited value to the original value.
  };

  return (
    <Card>
      <Box className={styles.budget_stats_container}>
        {isLoading ? (
          <Box className={styles.budget_stats_progress}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {icon && (
              <Fab
                variant="extended"
                size="large"
                color="primary"
                className={styles.icon}
              >
                {icon}
              </Fab>
            )}
            <Box>
              <Typography className={styles.title}>{title}</Typography>

              {editMode ? (
                <Box className={styles.action_box}>
                  <Input
                    type="number"
                    value={editedValue}
                    onChange={(e) => setEditedValue(Number(e.target.value))}
                  />
                  <IconButton onClick={handleSaveClick}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton onClick={handleCancelClick}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              ) : (
                <>
                  <Typography className={styles.currency}>
                    {formatAsCurrency(value)}
                  </Typography>
                  {error && (
                    <Box>
                      <Typography className={styles.error}>{error}</Typography>
                    </Box>
                  )}
                </>
              )}
            </Box>
            {action && (
              <Box className={styles.edit_icon}>
                {!editMode && (
                  <IconButton onClick={handleEditClick}>
                    <EditIcon color="primary" />
                  </IconButton>
                )}
              </Box>
            )}
          </>
        )}
      </Box>
    </Card>
  );
};

export default BudgetStatsCard;
