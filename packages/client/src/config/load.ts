import configJson from '@rolimoa/common/config';
import { configSchema } from './schema';

export const config = configSchema.strict().parse(configJson);
