<h1 align="center">Events</h1>

<h4 align="center">Event emitter for all engines</h4>

<blockquote align="center">
  <em>Partially implements the Node.js events module for environments that do not have it, like browsers
</blockquote>

<p align="center">
  <a aria-label="current github tag" href="https://github.com/bastienrobert/events/tags">
    <img alt="" src="https://img.shields.io/github/tag/bastienrobert/events.svg">
  </a>
  <a aria-label="maintainability" href="https://codeclimate.com/github/bastienrobert/events/maintainability">
    <img alt="" src="https://api.codeclimate.com/v1/badges/f3da7bb1259957bbac24/maintainability">
  </a>
  <a aria-label="coverage status" href="https://coveralls.io/github/bastienrobert/events">
    <img alt="" src="https://coveralls.io/repos/github/bastienrobert/events/badge.svg">
  </a>
  <a aria-label="build status" href="https://travis-ci.org/bastienrobert/events">
    <img alt="" src="https://travis-ci.org/bastienrobert/events.svg?branch=master">
  </a>
  <a aria-label="license" href="https://github.com/bastienrobert/events/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/bastienrobert/events.svg" alt="">
  </a>
</p>

## Install

```
npm install @bastienrobert/events
```

## Usage

```
import EventEmitter from '@bastienrobert/events'

const eventEmitter = new EventEmitter()
eventEmitter.on('foo', bar => {
  console.log(bar)
})
eventEmitter.emit('foo', 'here we go!')
```

## API

See the [Documentation](http://bastienrobert.github.io/events). You can check the [Node.js EventEmitter docs](http://nodejs.org/api/events.html) too, most methods are implemented in this package.
