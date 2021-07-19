export type USER_ROLE = "";

export type User = {
  id: number;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  profile_picture: string;
  contact_no: string;
  role: "User" | "Admin" | "External";
  active: boolean;
  authType: "google" | "email";
};

export type SignUpMutationData = {
  createAccount: {
    ok: boolean;
    error?: string;
    message?: string;
    user?: User;
    accessToken?: string;
  };
};

export type MeData = {
  me: User;
};
