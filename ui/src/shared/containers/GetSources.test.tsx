import React from 'react'
import {shallow} from 'enzyme'
import {GetSources} from 'src/shared/containers/GetSources'
import MockChild from 'mocks/MockChild'
import {SpinnerContainer} from 'src/clockface'

import {source} from 'mocks/dummyData'

const onReadSources = jest.fn(() => Promise.resolve())

const setup = (override?) => {
  const props = {
    onReadSources,
    sources: [source],
    router: {},
    location: {
      pathname: 'sources',
      query: {sourceID: source.id},
    },
    auth: {
      isUsingAuth: false,
      me: {},
    },
    notify: () => {},
    errorThrown: () => {},
    ...override,
  }

  const wrapper = shallow(
    <GetSources {...props}>
      <MockChild />
    </GetSources>
  )

  return {
    wrapper,
    props,
  }
}

describe('CheckSources', () => {
  describe('rendering', () => {
    it('renders', async () => {
      const {wrapper} = setup()
      expect(wrapper.exists()).toBe(true)
    })

    it('renders a spinner when the component is fetching', () => {
      const {wrapper} = setup()
      const spinner = wrapper.find(SpinnerContainer)

      expect(spinner.exists()).toBe(true)
    })

    it('renders its children when it is done fetching', done => {
      const {wrapper} = setup()

      // ensure that assertion runs after async behavior of getSources
      process.nextTick(() => {
        wrapper.update()
        const child = wrapper.find(MockChild)
        expect(child.exists()).toBe(true)
        done()
      })
    })
  })
})
