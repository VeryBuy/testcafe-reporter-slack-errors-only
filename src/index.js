const SlackMessage = require('./SlackMessage');
const UploadFile = require('./Uploader');

module.exports = function() {
  return {
    noColors: true,

    reportTaskStart(startTime, userAgents, testCount) {
      this.slack = new SlackMessage();
      this.startTime = startTime;
      this.testCount = testCount;

      console.log(
        `Starting testcafe ${startTime}. \n Running ${testCount} tests in: ${userAgents}`,
      );
    },

    reportFixtureStart(fixtureName) {
      this.currentFixtureName = fixtureName;
    },

    reportTestDone(testName, testRunInfo) {
      this.hasErrors = testRunInfo.errs.length > 0;

      if (this.hasErrors) {
        const title = `:no_entry_sign:  ${
          this.currentFixtureName
        } - ${testName}`;

        this.renderErrors(this.currentFixtureName, testRunInfo.errs);
        this.slack.sendTestReport(this.currentFixtureName, title);
      }
    },

    renderErrors(fixtureName, errors) {
      errors.forEach((error, id) => {
        this.slack.addErrorMessage(
          fixtureName,
          this.formatError(error, `${id + 1} `),
        );

        // upload screenshot
        UploadFile(error.screenshotPath);
      });
    },

    reportTaskDone(endTime, passed, warnings) {
      const durationMs = endTime - this.startTime;
      const durationStr = this.moment
        .duration(durationMs)
        .format('h[h] mm[m] ss[s]');

      console.log(
        `\n*${this.testCount - passed}/${
          this.testCount
        } failed* (Duration: ${durationStr})`,
      );
    },
  };
};
