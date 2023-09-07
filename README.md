# Using a custom Babel config

This example features:

- An app using proposed [do expressions](https://babeljs.io/docs/plugins/transform-do-expressions/).
- It uses babel-preset-stage-0, which allows us to use above JavaScript feature.
- It uses '.babelrc' file in the app directory to add above preset.

> Most of the time, when writing a custom `.babelrc` file, you need to add `next/babel` as a preset.