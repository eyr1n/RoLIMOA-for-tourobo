import { settingSchema, type SettingType } from '@rolimoa/common/schema';

const LOCAL_STORAGE_KEY = 'RoLIMOA-setting';

const defaultValues: Required<SettingType> = {
  deviceName: 'ななし＠役割なし',
  timeOffset: 0,
};

export function getSetting(): SettingType {
  const rawSetting = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!rawSetting) {
    return defaultValues;
  }

  const parseResult = settingSchema.partial().safeParse(JSON.parse(rawSetting));
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

export function setSetting(partialSetting: SettingType): void {
  const setting = { ...getSetting(), ...partialSetting };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(setting));
}
