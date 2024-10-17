import { Achievement } from "./Achievement";
import { Comment } from "./Comment";
import { Score } from "./Score";

// types.ts
export interface Player {
  name: string;
  number: string;
  photoURL: string;
  position: string[];
  comments: Comment[];
  scores: Score[];
  achievements: Achievement[];
}
