// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { corsHeaders } from '../_shared/cors.ts'

import { TwilioSms } from "./helpers/twilio-sms.ts";

const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID") || "";
const authToken = Deno.env.get("TWILIO_AUTH_TOKEN") || "";
const fromMobile = Deno.env.get("TWILIO_PHONE_NUMBER") || "";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  const { toMobile } = await req.json();

  const twilioClient = new TwilioSms(accountSid, authToken);

  const message = await twilioClient.sendSms({
    Body: `Your code is 123456 \n\n@one-time-password-sample.vercel.app #123456`,
    From: fromMobile,
    To: toMobile,
  });

  console.log({ message });

  const data = {
    isSuccess: false,
  };

  if (message.status === "queued") {
    data.isSuccess = true;
  }

  return new Response(JSON.stringify(data), {
    headers: {
    ...corsHeaders,
    "Content-Type": "application/json"
    },
  });
});


// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
