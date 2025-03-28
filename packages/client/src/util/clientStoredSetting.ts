import { Setting } from '@rolimoa/common/schema';

const LOCAL_STORAGE_KEY = 'RoLIMOA-setting';

const defaultValues: Required<Setting> = {
  deviceName: 'ななし＠役割なし',
  timeOffset: 0,
};

export function getSetting(): Setting {
  const rawSetting = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!rawSetting) {
    return defaultValues;
  }

  const parseResult = Setting.partial().safeParse(JSON.parse(rawSetting));
  if (!parseResult.success) {
    console.warn(
      'ふぇぇ…LocalStorageの設定が壊れているので、デフォルト値を使います',
    );
    return defaultValues;
  }

  return {
    ...defaultValues,
    ...parseResult.data,
  };
}

export function setSetting(partialSetting: Setting): void {
  const setting = { ...getSetting(), ...partialSetting };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(setting));
}
