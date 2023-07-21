export interface BaseChatMessage {
  id: number;
  // 대화 아이디 (채팅방을 만들었을 때 생성된다.)
  conversationId: string;
  // 메시지 아이디 (ex.e4c483d5-3851-4cae-a499-52872fa34986)
  messageId: string;
  // 이전 메시지 아이디 > 메시지를 나열할 때 필요
  parentMessageId: string | null;
  // 질문
  question: string;
  // 답변
  answer: string;
  // 답변에 대해 좋아요 유무 (NONE/LIKE/DISLIKE) > 현재 업스테이지에서는 feedback이라고 표현하고 있음
  feedback: string;
  // 메시지 발송 시간
  createdAt: Date;
  // 메시지 마지막 수정 시간 (답변 왔을 때/좋아요 눌렀을 때)
  updatedAt: Date;
}
