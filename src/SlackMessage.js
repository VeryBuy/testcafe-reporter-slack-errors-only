require('dotenv').config();

module.exports = class SlackMessage {
    constructor () {
        const SlackNode = require('slack-node');

        this.slack = new SlackNode();
        this.slack.setWebhook(process.env.TESTCAFE_SLACK_WEBHOOK);
        this.message = [];
        this.errorMessage = [];
    }

    addMessage (message) {
        this.message.push(message);
    }

    addErrorMessage (message) {
        this.errorMessage.push(message);
    }

    sendMessage (slackProperties = null) {
        this.slack.webhook(Object.assign({
            channel: process.env.TESTCAFE_SLACK_CHANNEL,
            username: process.env.TESTCAFE_SLACK_BOT
        }, slackProperties), function (err, response) {
            if (err) {
                console.log('Unable to send a message to slack');
                console.log(response);
            }
        });
    }

    sendTestReport (title) {
        this.sendMessage( 
            {
                attachments: [{
                    color: '#f40c3a',
                    title: title,
                    text: this.getTestReportMessage(),
                    ts: Date.now()/1000
                }]
            }
        );
    }

    getTestReportMessage () {
        let message = this.getSlackMessage();
        const errorMessage = this.getErrorMessage();

        if (errorMessage.length > 0)
            message = message + '\n\n\n```' + this.getErrorMessage() + '```';
        return message;
    }

    getErrorMessage () {
        return this.errorMessage.join('\n\n\n');
    }

    getSlackMessage () {
        return this.message.join('\n');
    }
}
