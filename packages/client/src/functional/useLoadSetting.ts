import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { unixtimeOffset } from '@/atoms/unixtimeOffset';
import { getSetting, setSetting } from '@/util/clientStoredSetting';
import { useSearchParams } from 'react-router-dom';

export const useLoadSetting = ()  => {
  const savedSetting = getSetting();
  const setTimeOffset = useSetRecoilState(unixtimeOffset);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [queryParam, _] = useSearchParams();

  useEffect(() => {
    let setting = savedSetting;

    // URLのクエリから設定
    const timeOffset = queryParam.get("timeOffset");
    if (timeOffset) {
      setting = { ...setting, timeOffset: parseInt(timeOffset) };
    }

    setTimeOffset(setting.timeOffset);

    console.debug("useLoadSetting", savedSetting, setting);
    setSetting(setting);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
