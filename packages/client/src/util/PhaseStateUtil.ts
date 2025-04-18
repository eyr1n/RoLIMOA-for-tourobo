import config from '@rolimoa/common/config';
import type { TimeProgress } from '@rolimoa/common/schema';

const defaultConfig = {
  id: 'default',
  type: 'default',
  description: '',
  time: Number.MAX_SAFE_INTEGER,
  isAutoTransition: false,
  style: {
    timerFormat: 's',
    timerType: 'countup',
  },
  custom: [],
} as Required<TimeProgress>;

export function getIndex(phaseId?: string): number {
  if (phaseId === undefined || phaseId === 'default') {
    return 0;
  }
  return config.time_progress.findIndex((phase) => phase.id === phaseId);
}

export function getConfig(phaseId?: string): Required<TimeProgress> {
  if (phaseId === undefined || phaseId === 'default') {
    return defaultConfig;
  }
  return {
    ...defaultConfig,
    ...config.time_progress[getIndex(phaseId)],
  };
}

export function getRawConfig(phaseId: string): TimeProgress {
  if (phaseId === 'default') {
    return defaultConfig;
  }
  return config.time_progress[getIndex(phaseId)];
}

export function isLast(phaseId: string): boolean {
  if (phaseId === 'default') {
    return true;
  }
  return getIndex(phaseId) + 1 === config.time_progress.length;
}

export function getFirstPhase(): string {
  return config.time_progress[0].id;
}

export function getLastPhase(): string {
  return config.time_progress[config.time_progress.length - 1].id;
}

export function getPrevPhase(phaseId: string): string {
  if (phaseId === 'default' || getIndex(phaseId) === 0) {
    return phaseId;
  }
  return config.time_progress[getIndex(phaseId) - 1].id;
}

export function getNextPhase(phaseId: string): string {
  if (phaseId === 'default' || isLast(phaseId)) {
    return phaseId;
  }
  return config.time_progress[getIndex(phaseId) + 1].id;
}
