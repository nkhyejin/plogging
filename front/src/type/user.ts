export interface User {
  id: number;
  email: string;
  name: string;
  token: string;
  reviews?: UserReviews[]; // 작성한 review 배열
  greenCrews?: UserGreenCrews[]; // 참여한 greenCrew  배열
  social: "origin" | "kakao" | "naver";
}
export interface UserReviews {
  reviewId?: number;
  title: string;
  description: string;
  createAt: Date;
}
export interface UserGreenCrews {
  crewId?: number;
  title: string;
  course: string;
  startAt: Date;
  area: string;
}
export interface UserRegisterForm extends Omit<User, "token"> {
  password: string;
  confirmPassword?: string;
}
export interface UserLoginForm extends Omit<User, "token"> {
  password: string;
}

export interface PasswordChangeForm {
  currentPassword: string;
  changePassword: string;
  confirmPassword: string;
}
export interface NameChangeForm {
  currentName: string;
  newName: string;
}
