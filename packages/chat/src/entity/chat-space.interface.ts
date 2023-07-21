export enum ChatSpaceState {
  NORMAL = 'NORMAL',
  DELETED = 'DELETED',
}
export interface BaseChatSpace {
  id: number;
  state: ChatSpaceState;
  spaceId: string;
  spaceName: string;
  createdAt: Date;
  updatedAt: Date;
}
