import { z } from 'zod';

const CommonStyle = z.object({
  width: z.number().optional(),
});

const Common = {
  id: z.string(),
  style: CommonStyle.optional(),
};

const Color = z.enum([
  'standard',
  'primary',
  'secondary',
  'error',
  'info',
  'success',
  'warning',
]);

export const TaskObjectToggleButton = z.object({
  ...Common,
  type: z.literal('toggle_button'),
  option: z.object({
    buttons: z.array(
      z.object({
        value: z.number(),
        label: z.string(),
        style: z
          .object({
            color: Color.optional(),
          })
          .optional(),
      }),
    ),
    vertical: z.boolean().optional(),
  }),
  style: CommonStyle.optional(),
});

export const TaskObjectToggleSwitch = z.object({
  ...Common,
  type: z.literal('toggle_switch'),
  option: z.object({
    off_value: z.number(),
    on_value: z.number(),
    off_label: z.string().optional(),
    on_label: z.string().optional(),
  }),
});

export const TaskObjectMultiButton = z.object({
  ...Common,
  type: z.literal('multi_button'),
  option: z.object({
    buttons: z.array(
      z.object({
        command: z.string().regex(/^[-+=]\d+$/),
        label: z.string(),
        style: z
          .object({
            color: Color.optional(),
            variant: z.enum(['text', 'outlined', 'contained']).optional(),
          })
          .optional(),
      }),
    ),
    vertical: z.boolean().optional(),
  }),
});

export const CustomControlPanel = z.union([
  TaskObjectToggleButton,
  TaskObjectToggleSwitch,
  TaskObjectMultiButton,
]);

export type TaskObjectToggleButton = z.infer<typeof TaskObjectToggleButton>;
export type TaskObjectToggleSwitch = z.infer<typeof TaskObjectToggleSwitch>;
export type TaskObjectMultiButton = z.infer<typeof TaskObjectMultiButton>;
export type CustomControlPanel = z.infer<typeof CustomControlPanel>;
