import jwt from 'jsonwebtoken';

/**
 * Generates short-lived Access Token (10–15 min)
 * Signed with ACCESS_TOKEN_SECRET
 */
export const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET || 'context_cart_super_secret_access_token_key_2026',
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }
  );
};

/**
 * Generates long-lived Refresh Token (7 days)
 * Signed with REFRESH_TOKEN_SECRET
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET || 'context_cart_super_secret_refresh_token_key_2026',
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
  );
};

/**
 * Standard cookie configuration for Refresh Token
 * Uses sameSite: 'none' and secure: true in production for cross-origin (Vercel -> Render) cookies
 */
export const getRefreshTokenCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  };
};
