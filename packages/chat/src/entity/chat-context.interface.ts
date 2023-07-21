export enum ChatContextTarget {
  COURSE = 'COURSE',
}
export interface BaseChatContext {
  id: number;
  state: string;
  type: string;
  spaceId: string;
  target: string;
  targetId: number;
  context: string;
  createdAt: Date;
  updatedAt: Date;
}
