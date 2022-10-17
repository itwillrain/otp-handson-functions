/**
 * Follow this setup guide to integrate the Deno language server with your editor:
 * @see https://deno.land/manual/getting_started/setup_your_environment
 * This enables autocomplete, go to definition, etc.
 */

import {serve} from './deps.ts';
import {corsHeaders} from '../_shared/mod.ts';
import {TwilioSms} from './helper/twilioSms.ts';
import {MessageTemplates} from "./helper/messageTemplate.ts";

export const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID') || '';
export const authToken = Deno.env.get('TWILIO_AUTH_TOKEN') || '';
export const fromMobile = Deno.env.get('TWILIO_PHONE_NUMBER') || '';

// SMSメッセージを送る関数
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {headers: corsHeaders});
  }

  const {toMobile} = await req.json() || '';
  const twilioClient = new TwilioSms(accountSid, authToken);

  const {status = ''} = await twilioClient.sendSms({
    Body: MessageTemplates.otpMessage('123456'),
    From: fromMobile,
    To: toMobile,
  });

  const data = {
    isSuccess: false,
  };

  if (status === 'queued') {
    data.isSuccess = true;
  }

  return new Response(JSON.stringify(data), {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
});
