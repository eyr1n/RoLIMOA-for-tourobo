import { useEffect } from 'react';
import { unixtimeOffset } from '@/atoms/unixtimeOffset';
import { getSetting, setSetting } from '@/util/clientStoredSetting';
import { useSearchParams } from 'react-router';
import { useSetAtom } from 'jotai';

export const useLoadSetting = () => {
  const savedSetting = getSetting();
  const setTimeOffset = useSetAtom(unixtimeOffset);

  const [queryParam, _] = useSearchParams();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    let setting = savedSetting;

    // URLのクエリから設定
    const timeOffset = queryParam.get('timeOffset');
    if (timeOffset) {
      setting = { ...setting, timeOffset: Number.parseInt(timeOffset) };
    }

    setTimeOffset(setting.timeOffset);

    console.debug('useLoadSetting', savedSetting, setting);
    setSetting(setting);
  }, []);
};
