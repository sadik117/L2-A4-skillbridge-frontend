export type SessionUser = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  emailVerified: boolean;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  banned: boolean;
};

export type SessionData = {
  user: SessionUser;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
