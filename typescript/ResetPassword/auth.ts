export interface ResetPasswordPayload {
  id: string;
  token: string;
  password: string;
  confirm_password: string;
}

export interface ResetPasswordResponse {
  status: boolean;
  message: string;
}