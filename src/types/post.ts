import { UserType } from "./user";

export type PostType = {
  id: number;
  title: string;
  body: string;
  userId: number;
  user: UserType;
}

export type CommentType = {
  id: number;
  name: string;
  email: string;
  body: string;
}
