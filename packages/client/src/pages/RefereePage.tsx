import { Grid } from '@mui/material';
import { Dashboard } from '@/components/Dashboard';
import { MatchResultContainer } from '@/components/Referee/MatchResultContainer';
import { OperationLogTable } from '@/components/Referee/OperationLogTable';

export function RefereePage() {
  return (
    <Dashboard title="主審入力">
      <Grid container spacing={3}>
        <Grid size={12}>
          <MatchResultContainer />
        </Grid>
        <Grid size={12}>
          <OperationLogTable />
        </Grid>
      </Grid>
    </Dashboard>
  );
}
