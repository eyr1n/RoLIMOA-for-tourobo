import { type FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@rolimoa/common/redux';
import { matchStateSlice } from '@rolimoa/common/redux';
import { phaseStateSlice } from '@rolimoa/common/redux';
import { scoreStateSlice } from '@rolimoa/common/redux';
import { unixtimeOffset } from '@/atoms/unixtimeOffset';
import { LyricalSocket } from '@/lyricalSocket';
import * as Phase from '@/util/PhaseStateUtil';
import config from '@rolimoa/common/config';
import { MatchMasterComponent } from './MatchMasterComponent';
import { useAtomValue } from 'jotai';
import type { TeamType } from '@rolimoa/common/schema';

// 省略名からチームリストの情報を取得、なければスタブを作成
function getTeamInfo(short: string): TeamType {
  const team = config.teams_info.find((team) => team.short === short);
  return {
    shortName: short,
    ...team,
  };
}

export const MatchMasterContainer: FC = () => {
  const teamList = config.teams_info.map((info) => info.short);
  const currentPhaseId = useSelector<RootState, string>(
    (state) => state.phase.current.id,
  );
  const timeOffset = useAtomValue(unixtimeOffset);
  const [matchName, setMatchName] = useState('');
  const [blueTeamName, setBlueTeamName] = useState('');
  const [redTeamName, setRedTeamName] = useState('');

  const onChangeMatchName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMatchName(event.target.value);
    },
    [],
  );
  const onChangeBlueTeamName = useCallback(
    (_: React.SyntheticEvent, name: string) => {
      setBlueTeamName(name);
    },
    [],
  );
  const onChangeRedTeamName = useCallback(
    (_: React.SyntheticEvent, name: string) => {
      setRedTeamName(name);
    },
    [],
  );

  const onSubmitButton = useCallback(() => {
    LyricalSocket.dispatchAll([
      // スコアの初期化
      scoreStateSlice.actions.setState(scoreStateSlice.getInitialState()),
      // チーム情報の更新
      matchStateSlice.actions.setState({
        name: matchName,
        teams: {
          blue: getTeamInfo(blueTeamName),
          red: getTeamInfo(redTeamName),
        },
        isConfirmed: false,
      }),
      // フェーズ遷移
      phaseStateSlice.actions.setState({
        id: Phase.getFirstPhase(),
        startTime: Date.now() + timeOffset,
      }),
    ]);
  }, [matchName, blueTeamName, redTeamName, timeOffset]);

  return (
    <MatchMasterComponent
      teamOptions={teamList}
      onChangeMatchName={onChangeMatchName}
      onChangeBlueTeamName={onChangeBlueTeamName}
      onChangeRedTeamName={onChangeRedTeamName}
      onStartButton={onSubmitButton}
      isEnabledStartButton={Phase.isLast(currentPhaseId)}
    />
  );
};
