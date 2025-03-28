import configJson from '@rolimoa/common/config';
import { configSchema } from '@rolimoa/common/schema';

export const config = configSchema.strict().parse(configJson);
