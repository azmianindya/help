import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Toast } from '@heroui/react'

export const Route = createRootRoute({
  component: () => {
    return (
      <React.Fragment>
        <Toast.Provider placement="top" />
        <Outlet />
      </React.Fragment>
    )
  },
})
