import EventEmitter from '../src/index'

test('should call listener', () => {
  const listener = jest.fn()
  const emitter = new EventEmitter()

  emitter.on('foo', listener)
  emitter.emit('foo')

  expect(listener).toBeCalledTimes(1)
})

test('should not call off listener', () => {
  const listener = jest.fn()
  const emitter = new EventEmitter()

  emitter.on('foo', listener)
  emitter.off('foo', listener)
  emitter.emit('foo')

  expect(listener).not.toBeCalled()
})

test('should call listener once', () => {
  const listener = jest.fn()
  const emitter = new EventEmitter()

  emitter.once('foo', listener)
  emitter.emit('foo')
  emitter.emit('foo')

  expect(listener).toBeCalledTimes(1)
})

test('should get params in on listener', () => {
  const listener = jest.fn()
  const emitter = new EventEmitter()

  emitter.on('foo', listener)
  emitter.emit('foo', 'bar', 'rab')

  expect(listener).toHaveBeenCalledWith('bar', 'rab')
})

test('should get params in once listener', () => {
  const listener = jest.fn()
  const emitter = new EventEmitter()

  emitter.once('foo', listener)
  emitter.emit('foo', 'bar', 'rab')

  expect(listener).toHaveBeenCalledWith('bar', 'rab')
})
