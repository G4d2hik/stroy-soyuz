"use server";

import https from 'https';

// Надёжная отправка в Telegram через модуль https (обходит проблему с сертификатами)
function sendTelegramMessage(token: string, chatId: string, text: string): Promise<boolean> {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "HTML",
    });

    const options: https.RequestOptions = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${token}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
      rejectUnauthorized: false, // Явно игнорируем ошибки сертификатов
      timeout: 15000,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk: string) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Telegram: сообщение отправлено успешно');
          resolve(true);
        } else {
          console.error('❌ Telegram API error:', res.statusCode, data);
          resolve(false);
        }
      });
    });

    req.on('error', (e: Error) => {
      console.error('❌ Telegram request error:', e.message);
      resolve(false);
    });

    req.on('timeout', () => {
      console.error('❌ Telegram request timeout');
      req.destroy();
      resolve(false);
    });

    req.write(postData);
    req.end();
  });
}

export async function submitLead(data: Record<string, string>, source: string = "Сайт") {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // 1. Форматируем сообщение для Telegram
    let messageText = `🔥 <b>Новая заявка (${source})</b>\n\n`;
    
    // Имя и Телефон
    if (data.name) messageText += `👤 Имя: ${data.name}\n`;
    if (data.phone) messageText += `📞 Телефон: ${data.phone}\n\n`;
    
    // Ответы из квиза (все остальные поля)
    const otherKeys = Object.keys(data).filter(k => k !== "name" && k !== "phone");
    if (otherKeys.length > 0) {
      messageText += `📋 <b>Ответы:</b>\n`;
      otherKeys.forEach(key => {
        messageText += `- ${key}: ${data[key]}\n`;
      });
    }

    // 2. Отправка в Telegram (через https модуль — обходит проблему с сертификатами)
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      await sendTelegramMessage(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, messageText);
    } else {
      console.warn('⚠️ TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы в .env');
    }

    // 3. Отправка в AmoCRM (имитация отправки встроенной формы)
    try {
      const formData = new URLSearchParams();
      formData.append("form_id", "1705402");
      formData.append("hash", "bc02a012c97a57400185c52c3a255066");
      
      if (data.name) formData.append("fields[name_1]", data.name);
      if (data.phone) formData.append("fields[1218135_1][1165445]", data.phone);

      // Примечание (Отправляем все ответы как примечание к сделке)
      if (otherKeys.length > 0) {
        let noteText = `Заявка с сайта (Источник: ${source})\n`;
        otherKeys.forEach(key => {
          noteText += `- ${key}: ${data[key]}\n`;
        });
        formData.append("notes[0][TEXT]", noteText);
        formData.append("notes[0][ELEMENT_TYPE]", "2");
      }

      const amoRes = await fetch("https://forms.amocrm.ru/queue/add", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });
      
      if (!amoRes.ok) {
        console.error("AmoCRM Form Error:", await amoRes.text());
      }
    } catch (e) {
      console.error("Ошибка при отправке в AmoCRM:", e);
    }

    return { success: true };
  } catch (error) {
    console.error("Ошибка при отправке заявки:", error);
    return { success: false, error: "Не удалось отправить заявку" };
  }
}
