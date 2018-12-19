# yx

[![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)

> Having trouble remembering what command to start/test/lint/xxx your project?
>
> `yx` is all you need to remember.

## How does it work?

`yx` finds commands in the following location:
- [x] `"scripts"` in `package.json`
- [x] `node_modules/.bin/`

and present it as an autocomplete in the terminal, so you can search and filter the command to run.

## Demo

![demo](./demos/yx.gif)

## Installation

You can install `yx` globally via:

```
$ npm install --global @tanhauhau/yx
```
