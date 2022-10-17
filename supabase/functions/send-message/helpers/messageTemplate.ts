const DOMAIN = 'one-time-password-sample.vercel.app';

/**
 * SMS Message Templates
 */
export class MessageTemplates {

  /** OTP送信用メッセージ */
  static otpMessage(code: string): string {
    return `Your code is ${code}.\n\n@${DOMAIN} #${code}`;
  }
}