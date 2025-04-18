import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { Dashboard } from '@/components/Dashboard';
import { useSelector } from 'react-redux';
import type { RootState } from '@rolimoa/common/redux';
import { styled } from '@mui/material/styles';
import type { ResultRecord } from '@rolimoa/common/schema';

export function GameResultsList() {
  const results = useSelector<RootState, ResultRecord[]>(
    (state) => state.resultRecords,
  );

  const WinMark = styled('span')({
    color: blue[500],
    fontWeight: 'bold',
  });

  const LossMark = styled('span')({
    color: red[500],
    fontWeight: 'bold',
  });

  return (
    <Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>試合名</TableCell>
              <TableCell align="right">青チーム</TableCell>
              <TableCell align="right">得点</TableCell>
              <TableCell align="right">Vゴール</TableCell>
              <TableCell align="right">赤チーム</TableCell>
              <TableCell align="right">得点</TableCell>
              <TableCell align="right">Vゴール</TableCell>
              <TableCell align="right">勝者</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => {
              const shouldMarkBlue = result.finalScore.fields.blue.winner;
              const shouldMarkRed = result.finalScore.fields.red.winner;

              return (
                <TableRow key={result.confirmedAt}>
                  <TableCell>{result.match.name}</TableCell>
                  <TableCell align="right">
                    {result.match.teams.blue?.shortName}
                  </TableCell>
                  <TableCell align="right">
                    {result.confirmedScore.blue}
                  </TableCell>
                  <TableCell align="right">
                    {result.finalScore.fields.blue.vgoal ?? '-'}
                  </TableCell>
                  <TableCell align="right">
                    {result.match.teams.red?.shortName}
                  </TableCell>
                  <TableCell align="right">
                    {result.confirmedScore.red}
                  </TableCell>
                  <TableCell align="right">
                    {result.finalScore.fields.red.vgoal ?? '-'}
                  </TableCell>
                  <TableCell align="right">
                    {shouldMarkBlue && <WinMark>青</WinMark>}
                    {shouldMarkRed && <LossMark>赤</LossMark>}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export function HomePage() {
  return (
    <Dashboard title="Dashboard">
      <Grid container>
        <Grid size={12}>
          <Paper sx={{ padding: '1em' }}>
            <GameResultsList />
          </Paper>
        </Grid>
      </Grid>
    </Dashboard>
  );
}
