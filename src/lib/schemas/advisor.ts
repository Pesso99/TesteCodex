import { z } from "zod";

export const RadarItemSchema = z.object({
  id: z.string(),
  source: z.string(),
  title: z.string(),
  link: z.string().url(),
  publishedAt: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
  educationalDisclaimer: z.string()
});

export const TriggerSchema = z.object({
  id: z.string(),
  radarItemId: z.string(),
  trigger: z.string(),
  whyItMatters: z.string(),
  approachSuggestion: z.string(),
  audience: z.array(z.string())
});

export const ComposeRequestSchema = z.object({
  archetype: z.enum(["conservative", "income", "growth", "hnw", "trader"]),
  objective: z.string().min(8),
  tone: z.enum(["formal", "friendly"]),
  channel: z.enum(["whatsapp", "email", "phone"]),
  contextTrigger: z.string().optional()
});

export const ComposeResponseSchema = z.object({
  outreachStrategy: z.string(),
  script: z.object({
    whatsapp: z.string(),
    email: z.string(),
    phone: z.string()
  }),
  objections: z.array(
    z.object({
      objection: z.string(),
      response: z.string()
    })
  ),
  followUps: z.array(
    z.object({
      timing: z.string(),
      action: z.string()
    })
  ),
  safetyNotes: z.array(z.string())
});

export type RadarItem = z.infer<typeof RadarItemSchema>;
export type Trigger = z.infer<typeof TriggerSchema>;
export type ComposeRequest = z.infer<typeof ComposeRequestSchema>;
export type ComposeResponse = z.infer<typeof ComposeResponseSchema>;
