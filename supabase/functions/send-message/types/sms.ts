/**
 * SMSRequest Request Parameters
 */
export interface SMSRequest {
  [index: string]: string;
  /** SMS の送信に使用する Twilio 電話番号 */
  From: string;
  /** SMS メッセージを受信する電話番号 */
  To: string;
  /** SMS コンテンツ */
  Body: string;
}
