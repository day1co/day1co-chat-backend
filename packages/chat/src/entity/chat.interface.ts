export enum ChatType {
  UPSTAGE = 'UPSTAGE',
  OPEN_AI = 'OPEN_AI',
}
export enum ChatState {
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  EXPIRED = 'EXPIRED',
}
export interface BaseChat {
  id: number;
  type: ChatType;
  state: ChatState;
  spaceId: string;
  conversationId: string;
  contextId: number;
  customerId: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
