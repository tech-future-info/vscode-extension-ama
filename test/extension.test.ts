import { afterEach, describe, expect, it, vi } from 'vitest'
import {getOpenAIKeyAMA, getOpenAIKeyAMAAzure} from '../src/extension'
afterEach(() => {
  vi.restoreAllMocks()
})

describe('extension Test Suite', () => {
  it('query is defined', () => {
    expect(getOpenAIKeyAMA()).toBeDefined()
  })

  it('query is defined', () => {
    expect(getOpenAIKeyAMAAzure()).toBeDefined()
  })


})
