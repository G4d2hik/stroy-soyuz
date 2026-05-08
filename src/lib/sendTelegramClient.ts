// Отправка уведомления в Telegram прямо из браузера посетителя.
// Используем mode: 'no-cors' + form-urlencoded, чтобы обойти ограничения CORS.
// Сервер Timeweb не может связаться с Telegram, поэтому отправляем из браузера.

const TG_BOT_TOKEN = "8404066937:AAFQdFBXlnwCG3uWsBP9iMDnJ7_jPwjymrU";
const TG_CHAT_ID = "-1003745737386";

export function sendTelegramFromBrowser(data: Record<string, string>, source: string = "Сайт") {
  try {
    let text = `🔥 Новая заявка (${source})\n\n`;
    if (data.name) text += `👤 Имя: ${data.name}\n`;
    if (data.phone) text += `📞 Телефон: ${data.phone}\n\n`;

    const otherKeys = Object.keys(data).filter(k => k !== "name" && k !== "phone");
    if (otherKeys.length > 0) {
      text += `📋 Ответы:\n`;
      otherKeys.forEach(key => {
        text += `- ${key}: ${data[key]}\n`;
      });
    }

    const params = new URLSearchParams({
      chat_id: TG_CHAT_ID,
      text: text,
    });

    // mode: 'no-cors' + form-urlencoded = "simple request", браузер отправит без preflight
    fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    }).catch(() => {
      // Ошибку глушим — мы всё равно не можем прочитать ответ в режиме no-cors
    });
  } catch {
    // Не блокируем пользователя из-за ошибки уведомления
  }
}
