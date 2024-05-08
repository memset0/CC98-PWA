import React from 'react'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

import { ThemeProvider } from '@material-ui/styles'

import { getTheme } from '@/theme'

import Layout from '@/Layout'

const Root = () => {
  const { theme, mode } = useModel(settingModel, ['theme', 'mode'])

  return (
    <ThemeProvider theme={getTheme(theme, mode)}>
      <Layout />
    </ThemeProvider>
  )
}

export default Root
