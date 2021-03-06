import EventEmitter from '../src/index'

test('should call listeners', () => {
  const listeners = [jest.fn(), jest.fn()]
  const emitter = new EventEmitter()

  emitter.on('foo', listeners[0])
  emitter.addListener('foo', listeners[1])
  emitter.emit('foo')

  expect(listeners[0]).toBeCalledTimes(1)
  expect(listeners[1]).toBeCalledTimes(1)
})

test('should pass arguments to listeners', () => {
  const listener = jest.fn((x, y, z) => x + y + z)
  const emitter = new EventEmitter()

  emitter.on('foo', listener)
  emitter.emit('foo', 1, 2, 3)

  expect(listener).toBeCalledTimes(1)
  expect(listener).toBeCalledWith(1, 2, 3)
})

test('should not call off listeners', () => {
  const listeners = [jest.fn(), jest.fn()]
  const emitter = new EventEmitter()

  emitter.on('foo', listeners[0])
  emitter.off('foo', listeners[0])

  emitter.addListener('foo', listeners[1])
  emitter.removeListener('foo', listeners[1])

  emitter.emit('foo')

  expect(listeners[0]).not.toBeCalled()
  expect(listeners[1]).not.toBeCalled()
})

test('should call listener once', () => {
  const listener = jest.fn()
  const emitter = new EventEmitter()

  emitter.once('foo', listener)
  emitter.emit('foo')
  emitter.emit('foo')

  expect(listener).toBeCalledTimes(1)
})

test('should remove all listeners by name', () => {
  const listeners = [jest.fn(), jest.fn()]
  const emitter = new EventEmitter()

  emitter.on('foo', listeners[0])
  emitter.on('foo', listeners[1])
  emitter.removeAllListeners('foo')
  emitter.emit('foo')

  expect(listeners[0]).toBeCalledTimes(0)
  expect(listeners[1]).toBeCalledTimes(0)
})

test('should remove all listeners', () => {
  const listeners = [jest.fn(), jest.fn()]
  const emitter = new EventEmitter()

  emitter.on('foo', listeners[0])
  emitter.on('bar', listeners[1])
  emitter.removeAllListeners()
  emitter.emit('foo')
  emitter.emit('bar')

  expect(listeners[0]).toBeCalledTimes(0)
  expect(listeners[1]).toBeCalledTimes(0)
})

test('should get params in on listeners', () => {
  const listeners = [jest.fn(), jest.fn()]
  const emitter = new EventEmitter()

  emitter.on('foo', listeners[0])
  emitter.addListener('foo', listeners[1])
  emitter.emit('foo', 'bar', 'rab')

  expect(listeners[0]).toHaveBeenCalledWith('bar', 'rab')
  expect(listeners[1]).toHaveBeenCalledWith('bar', 'rab')
})

test('should get params in once listener', () => {
  const listener = jest.fn()
  const emitter = new EventEmitter()

  emitter.once('foo', listener)
  emitter.emit('foo', 'bar', 'rab')

  expect(listener).toHaveBeenCalledWith('bar', 'rab')
})

test('should get events names', () => {
  const listener = jest.fn()
  const emitter = new EventEmitter()

  emitter.on('foo', listener)
  const names = emitter.eventNames

  expect(names).toEqual(['foo'])
})

test('should get number of events according to the given name', () => {
  const listener = jest.fn()
  const emitter = new EventEmitter()

  emitter.on('foo', listener)

  expect(emitter.listenerCount('foo')).toEqual(1)
})

test('should get a copy of the events according to the given name', () => {
  const listener = jest.fn()
  const emitter = new EventEmitter()

  emitter.on('foo', listener)

  expect(emitter.listeners('foo')).toEqual([listener])
  expect(emitter.listeners('bar')).toEqual([])
})
