export type MessageSchema = {
  uuid: string;
  title: string;
  content: string;
  categories: string[];
  isRead: boolean;
  createdAt: string;
};
