import { type FC, useState } from 'react';
import { ScoreBlock, type ScoreBlockProps } from '@/components/ScoreBlock';
import { TimerDisplay } from '@/components/TimerDisplay';
import { usePlaySoundEffect } from '@/functional/usePlaySoundEffect';
import { Box, Grid, IconButton } from '@mui/material';
import { CenterFlex } from '@/ui/CenterFlex';
import CachedIcon from '@mui/icons-material/Cached';

export const ScreenPage: FC = () => {
  usePlaySoundEffect();

  const [reverse, setReverse] = useState(false);
  const onReverseClick = () => {
    setReverse((toggle) => !toggle);
  };

  const scoreBlockProps: Partial<ScoreBlockProps> = {
    rootSx: {
      borderWidth: '3px',
    },
    scoreVariant: 'h1',
    teamNameVariant: 'h4',
  };

  return (
    <Box sx={{ padding: '2em' }}>
      <Grid container spacing={6}>
        {/* スコア */}
        <Grid
          size={12}
          container
          sx={{
            justify: 'space-between',
            alignItems: 'center',
            flexDirection: reverse ? 'row-reverse' : 'row',
          }}
        >
          <Grid size={5}>
            <ScoreBlock fieldSide="blue" {...scoreBlockProps} />
          </Grid>
          <Grid size={2}>
            <CenterFlex
              sx={{
                opacity: 0.1,
                transition: 'opacity',
                '&:hover': {
                  opacity: 1.0,
                },
              }}
            >
              <IconButton
                aria-label="delete"
                color="default"
                onClick={onReverseClick}
              >
                <CachedIcon />
              </IconButton>
            </CenterFlex>
          </Grid>
          <Grid size={5}>
            <ScoreBlock fieldSide="red" {...scoreBlockProps} />
          </Grid>
        </Grid>
        {/* タイム */}
        <Grid size={12}>
          <TimerDisplay
            descriptionSx={{
              marginTop: '.5em',
              marginBottom: '.5em',
              fontSize: '400%',
            }}
            displayTimeSx={{
              fontSize: '1200%',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
