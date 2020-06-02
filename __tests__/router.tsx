import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

export const RouterWrapper = ({ children }: { children?: React.ReactNode }) => {
  return <Router history={history}>{children}</Router>
}
