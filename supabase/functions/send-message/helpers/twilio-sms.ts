import {base64} from '../deps.ts';
import {SMSRequest} from '../types/sms.ts';

/**
 * Twilio SMS Client Class
 */
export class TwilioSms {
  private readonly authorizationHeader: string;

  /**
   * Create Authorization Header
   * @param accountSID
   * @param authToken
   */
  constructor(private accountSID: string, authToken: string) {
    this.authorizationHeader = `Basic ${
      base64.fromUint8Array(
        new TextEncoder().encode(`${accountSID}:${authToken}`),
      )
    }`;
  }

  /**
   * SMS送信
   * @param payload SMSRequest
   */
  async sendSms(payload: SMSRequest): Promise<any> {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${this.accountSID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Authorization: this.authorizationHeader,
        },
        body: new URLSearchParams(payload).toString(),
      },
    );

    return await res.json();
  }
}
