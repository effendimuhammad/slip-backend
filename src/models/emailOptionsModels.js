import EmailMessageType from "./emailMessageModels.js";

const createEmailOptions = (
  to,
  subject,
  message,
  messageType = EmailMessageType.TEXT,
  cc,
  from,
  replyTo
) => {
  return {
    to,
    subject,
    message,
    messageType,
    cc,
    from,
    replyTo,
  };
};

export default createEmailOptions;
