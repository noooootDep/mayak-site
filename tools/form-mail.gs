// Принимает вопросы с формы mayakexpert.ru, пишет их на лист «Заявки» и отправляет письмом.
// Ставится в Google-таблицу: Расширения → Apps Script, затем «Развернуть» как веб-приложение.

const TO = "mayak.izh@yandex.ru";
const SUBJECT = "Технический вопрос с сайта ООО «Маяк»";
const FIELDS = [
  ["name", "Имя"],
  ["company", "Организация"],
  ["phone", "Телефон"],
  ["email", "Почта"],
  ["type", "Тип работ"],
  ["message", "Вопрос"]
];

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (data._honey) return reply({ ok: true });
    const values = FIELDS.map(([key]) => String(data[key] || "").trim().slice(0, 5000));
    if (!values[0] || !values[2] || !values[5]) return reply({ ok: false, error: "empty" });

    const sheet = getSheet();
    sheet.appendRow([new Date()].concat(values));

    const rows = FIELDS
      .map(([, label], i) => values[i] ? [label, values[i]] : null)
      .filter(Boolean);
    const text = rows.map(([label, value]) => label + ": " + value).join("\n");
    const html = '<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">' +
      rows.map(([label, value]) => '<tr><td style="border:1px solid #d5e0d6;background:#f4f7f3;font-weight:bold;vertical-align:top">' + escape(label) +
        '</td><td style="border:1px solid #d5e0d6;white-space:pre-wrap">' + escape(value) + "</td></tr>").join("") +
      "</table>";

    const mail = { to: TO, subject: SUBJECT, body: text, htmlBody: html, name: "Сайт ООО «Маяк»" };
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[3])) mail.replyTo = values[3];
    MailApp.sendEmail(mail);

    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function doGet() {
  return reply({ ok: true, service: "mayak-form" });
}

function getSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName("Заявки");
  if (!sheet) {
    sheet = book.insertSheet("Заявки");
    sheet.appendRow(["Дата"].concat(FIELDS.map(([, label]) => label)));
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function escape(value) {
  return String(value).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Запустите один раз вручную из редактора, чтобы выдать скрипту доступ к почте и таблице.
function test() {
  getSheet();
  MailApp.sendEmail(Session.getActiveUser().getEmail(), "Проверка скрипта формы Маяк", "Скрипт работает.");
}
