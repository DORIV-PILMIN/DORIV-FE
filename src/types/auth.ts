// OAuth Provider 타입
export type OAuthProvider = "google" | "kakao";

// OAuth 로그인 요청
export interface OAuthLoginRequest {
  provider: OAuthProvider;
  code: string;
  redirectUri: string;
  codeVerifier: string;
}

// 토큰 정보
export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  refreshTokenExpiresIn: number;
}

// 사용자 정보
export interface User {
  userId: string;
  email: string;
  name: string;
  profileImage: string;
}

// OAuth 로그인 응답
export interface OAuthLoginResponse {
  tokens: TokenInfo;
  user: User;
  isNewUser: boolean;
}

// OAuth 에러 응답
export interface OAuthErrorResponse {
  error: string;
  message: string;
}
