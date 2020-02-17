import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

const history = createMemoryHistory()

export const routerWrapper = ({ children }: { children?: React.ReactNode }) => {
  return <Router history={history}>{children}</Router>
}
