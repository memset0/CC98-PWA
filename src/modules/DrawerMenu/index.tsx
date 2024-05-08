import React from 'react'

import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import useModel from '@/hooks/useModel'
import stateModel from '@/models/state'

import { Drawer, List } from '@material-ui/core'

import DrawerContent from './DrawerContent'

export const mobileDrawerWidth = 180
export const desktopDrawerWidth = 220

const DrawerMenu: React.FC = () => {
  const { isDrawerOpen } = useModel(stateModel, ['isDrawerOpen'])
  const { CLOSE_DRAWER } = stateModel

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  if (isDesktop) {
    CLOSE_DRAWER()
  }

  return (
    <>
      <div style={isDesktop ? { display: 'none' } : { display: 'block' }}>
        <Drawer open={isDrawerOpen} onClose={CLOSE_DRAWER} variant="temporary">
          <List style={{ width: mobileDrawerWidth }} onClick={CLOSE_DRAWER}>
            <DrawerContent />
          </List>
        </Drawer>
      </div>
      <div style={isDesktop ? { display: 'block' } : { display: 'none' }}>
        <Drawer open={true} variant="permanent">
          <List style={{ width: desktopDrawerWidth }}>
            <DrawerContent />
          </List>
        </Drawer>
      </div>
    </>
  )
}

export default DrawerMenu
