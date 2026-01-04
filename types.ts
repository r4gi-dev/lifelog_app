export type LifeLogType = 'task' | 'schedule' | 'photo';

export interface LifeLog {
  id: string;
  type: LifeLogType;
  title?: string;
  description?: string;
  date: string;        // ISO8601 (YYYY-MM-DD)
  createdAt: string;  // ISO8601
}

export interface PhotoLog extends LifeLog {
  type: 'photo';
  uri: string; // local file uri
}
