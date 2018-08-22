# testcafe-reporter-slack-errors-only
[![Build Status](https://travis-ci.org/edenadler/testcafe-reporter-slack-errors-only.svg)](https://travis-ci.org/edenadler/testcafe-reporter-slack-errors-only)

This is the **slack-errors-only** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/edenadler/testcafe-reporter-slack-errors-only/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-slack-errors-only
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter slack-errors-only
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('slack-errors-only') // <-
    .run();
```

## Important Note

If you are looping over your test fixtures, each test fixture **must** have a unique name (otherwise error reports will be all grouped together under the same name, making it difficult to attribute the source of the error for each test)  

For example:  

```js
//test.js  

function testFlow(config) {

    fixture(`${config.testName}`)
        .page `http://example.com`

        test('Example', async t => {
            await config.testing();
        });
}

const testSuite = getTestSuite();

for (const config of testSuite) {
    testFlow(config);
}
```

## Author
Eden Adler 
