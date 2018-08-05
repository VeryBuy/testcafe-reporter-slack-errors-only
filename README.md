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

## Author
Eden Adler 
