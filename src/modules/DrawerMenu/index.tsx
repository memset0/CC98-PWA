import React from 'react'

import useModel from '@/hooks/useModel'
import stateModel from '@/models/state'

import { Drawer, List } from '@material-ui/core'

import DrawerContent from './DrawerContent'

interface Props {
  isDesktop: boolean
}

export const mobileDrawerWidth = 180
export const desktopDrawerWidth = 220

const DrawerMenu: React.FC<Props> = ({ isDesktop }: Props) => {
  const { isDrawerOpen } = useModel(stateModel, ['isDrawerOpen'])
  const { CLOSE_DRAWER } = stateModel

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
