import React from 'react'
import muiStyled from '@/muiStyled'

import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { Paper } from '@material-ui/core'
import Container from '@/components/Container'

import TopBar from '@/modules/TopBar'
import DrawerMenu from '@/modules/DrawerMenu'
import Router from '@/router'

const Background = muiStyled(Paper).attrs({
  square: true,
  elevation: 0,
})({
  position: 'fixed',
  width: '200vw',
  height: '100%',
  zIndex: -1,
  transform: 'translateX(-100vw)',
})

// 该占位符高度和 TopBar 保持一致
const Placeholder = muiStyled('div')(({ theme }) => ({
  height: 56,
  backgroundColor: theme.palette.primary.main,
}))

const Layout = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <>
      <Background />
      <DrawerMenu isDesktop={isDesktop} />
      <div style={isDesktop ? { paddingLeft: 220 } : { width: '100%' }}>
        <Container>
          <Placeholder />
          <TopBar isDesktop={isDesktop} />
          <Router />
        </Container>
      </div>
    </>
  )
}

export default Layout
