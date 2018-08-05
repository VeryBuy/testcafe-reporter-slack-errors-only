
const SlackMessage = require('./SlackMessage');

module.exports = function () {
    return {
        noColors: true,
        
        reportTaskStart (startTime, userAgents, testCount) {
            this.slack = new SlackMessage();
            this.startTime = startTime;
            this.testCount = testCount;

            console.log(`Starting testcafe ${startTime}. \n Running ${testCount} tests in: ${userAgents}`);
        },

        reportFixtureStart (name) {
            this.currentFixtureName = name;
        },

        reportTestDone (name, testRunInfo) {
            this.hasErrors = testRunInfo.errs.length > 0;

            if (this.hasErrors) {
                const title = `:no_entry_sign:  ${this.currentFixtureName} - ${name}`;

                this.renderErrors(testRunInfo.errs);
                this.slack.sendTestReport(title);
            }
        },

        renderErrors (errors) {
            errors.forEach((error, id) => {
                this.slack.addErrorMessage(this.formatError(error, `${id + 1} `));
            });
        },

        reportTaskDone (endTime, passed, warnings) {
            const durationMs  = endTime - this.startTime;
            const durationStr = this.moment
                .duration(durationMs)
                .format('h[h] mm[m] ss[s]');

            console.log(`\n*${this.testCount - passed}/${this.testCount} failed* (Duration: ${durationStr})`);
        }
    };
}
