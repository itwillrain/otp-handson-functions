# OTP hands on functions

このレポジトリは、supabaseのedge functionsを利用して、smsメッセージを送信する関数を作成します。

## Requirements
* supabaseのアカウント
* twilioのアカウント

## 環境構築

1. [Supabase CLI](https://supabase.com/docs/guides/cli) インストールする
2. CLIからSupabaseログインする
    * `supabase login`
3. `supabase link --project-ref {プロジェクトID}`で紐付ける
4. 各IDEの[設定](https://deno.land/manual@v1.26.1/getting_started/setup_your_environment)をしてください。