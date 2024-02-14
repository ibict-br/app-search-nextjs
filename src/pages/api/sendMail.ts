import nodemailer from 'nodemailer';
export type BodyType = {
  recipient: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendMail({ recipient, subject, text, html }: BodyType) {
  console.log('enviando email');
  const MAILPORT = process.env.MAIL_PORT;
  const MAILHOST = process.env.MAIL_HOST;
  const MAILSENDER = process.env.MAIL_SENDER;
  const PASSWORD = process.env.MAIL_PASSWORD;
  const RECIPIENT = process.env.MAIL_RECIPIENT;

  if (!MAILPORT || !MAILHOST || !MAILSENDER || !PASSWORD || !recipient) {
    console.error('Variáveis de ambiente faltando ou indefinidas');
    throw new Error('Variáveis de ambiente faltando ou indefinidas');
  }

  const transporter = nodemailer.createTransport({
    port: Number(MAILPORT),
    host: MAILHOST,
    auth: {
      user: MAILSENDER,
      pass: PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // quando resolver o problema de DNS remover esta configuração
    },
    logger: true,
    debug: true,
    // secure: true,
  });

  const mailData = {
    from: MAILSENDER,
    to: recipient || RECIPIENT,
    subject: subject,
    text: text,
    html: html,
  };

  const mailResponse = await transporter.sendMail(mailData);
  return mailResponse;
}
