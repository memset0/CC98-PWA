import React from 'react'
import muiStyled from '@/muiStyled'

import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import stateModel from '@/models/state'

import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'

import version from '@/version'

const AppBarS = muiStyled(AppBar)({
  maxWidth: 600,
  left: 'auto',
  right: 'auto',
})

const ToolbarS = muiStyled(Toolbar)({
  '@media (min-width: 600px)': {
    minHeight: 56,
  },
})

const IconButtonS = muiStyled(IconButton).attrs({
  color: 'inherit',
})({
  marginLeft: -12,
  marginRight: 5,
})

const MainText = muiStyled(Typography).attrs({
  color: 'inherit',
})({
  flexGrow: 1,
})

const Version = muiStyled(Button).attrs({
  color: 'inherit',
  size: 'small',
})({
  marginRight: -12,
})

const TopBar: React.FC = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <AppBarS elevation={0}>
      <ToolbarS>
        <IconButtonS
          onClick={stateModel.OPEN_DRAWER}
          style={isDesktop ? { display: 'none' } : { display: 'block' }}
        >
          <MenuIcon />
        </IconButtonS>

        <MainText>CC98</MainText>
        <Version>{version}</Version>
      </ToolbarS>
    </AppBarS>
  )
}

export default TopBar
