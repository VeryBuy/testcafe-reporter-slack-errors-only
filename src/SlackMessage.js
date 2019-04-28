require('dotenv').config();

module.exports = class SlackMessage {
  constructor() {
    const SlackNode = require('slack-node');

    this.slack = new SlackNode();
    this.slack.setWebhook(process.env.TESTCAFE_SLACK_WEBHOOK);
    this.errorMessage = {};
  }

  addErrorMessage(name, message) {
    if (this.errorMessage.hasOwnProperty(name)) {
      this.errorMessage[name].push(message);
    } else {
      this.errorMessage[name] = [message];
    }
  }

  sendMessage(slackProperties = null) {
    this.slack.webhook(
      Object.assign(
        {
          channel: process.env.TESTCAFE_SLACK_CHANNEL,
          username: process.env.TESTCAFE_SLACK_BOT,
        },
        slackProperties,
      ),
      function(err, response) {
        if (err) {
          console.log('Unable to send a message to slack');
          console.log(response);
        }
      },
    );
  }

  sendTestReport(name, title) {
    this.sendMessage({
      attachments: [
        {
          color: '#f40c3a',
          title: title,
          text: this.getTestReportMessage(name),
          ts: Date.now() / 1000,
        },
      ],
    });
  }

  getTestReportMessage(name) {
    let message = '';
    const errorMessage = this.errorMessage[name];

    if (errorMessage.length > 0)
      message += '\n\n\n```' + this.getErrorMessage(name) + '```';

    console.log(message);

    return message;
  }

  getErrorMessage(name) {
    return this.errorMessage[name].join('\n\n\n');
  }
};
