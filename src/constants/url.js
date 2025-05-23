export const URLS = {
  login: "/api/v1/auth/jwt/create/",
  refresh: "/api/v1/auth/jwt/refresh",
  verify: "/api/v1/auth/jwt/verify/",
  register: "/api/v1/users/",
  profile: "/api/v1/users/me/",
  updateMe: "/api/v1/users/me/", //update: pdf || word || txt
  sendCodeForPassword: "/api/v1/users/send_recovery_code/", //Parolni tiklash kodi yuborish:
  updatePassword: "/api/v1/users/password_recovery/", //
  auto_payment: "/api/v1/users/update_auto_payment/",
  sendCodeForActive: "/api/v1/users/send_activation_code/",
  activeProfile: "/api/v1/users/activate_account/",

  tarif__yearly: "/api/v1/plans/?plan_type=yearly",
  tarif__monthly: "/api/v1/plans/?plan_type=monthly",

  payment_history: "/api/v1/users/history/",

  send_url: "/api/v1/send_url/",
  file_upload: "/api/v1/upload/",

  transcriptions: "/api/v1/transcriptions/",

  update_user: "/api/v1/users/",
  purchases_create: "/api/v1/purchases/",
  calendar: "/api/v1/calendar/subscribe/", // post/deletes
  news: "/api/v1/news/ ",
  support: "/api/v1/support/",
  statistic: "/api/v1/users/statistics/",
  google: "/api/v1/auth/link/google/",
  connect_calendar: "/api/v1/users/social_auth/",
  asistants: "/api/v1/assistants/",
  file_analysis: "/api/v1/file_analysis",

  module: "/api/v1/instructions/",

  cases: "/api/v1/cases/",

  update_bitrix: "/api/v1/users/update_bitrix_webhook/",
  telegram_id_update: "/api/v1/users/user_manage_telegram_id/",

  upload_analysis: "/api/v1/upload_analysis/",
};
