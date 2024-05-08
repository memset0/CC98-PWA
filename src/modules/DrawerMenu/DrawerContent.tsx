import React from 'react'
import { navigate } from '@/utils/history'
import muiStyled from '@/muiStyled'

import useModel from '@/hooks/useModel'
import userModel from '@/models/user'
import settingModel from '@/models/setting'

import AspectRatioIcon from '@material-ui/icons/AspectRatio'
import BookIcon from '@material-ui/icons/Book'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import FiberNewIcon from '@material-ui/icons/FiberNew'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import PetsIcon from '@material-ui/icons/Pets'
import SettingsIcon from '@material-ui/icons/Settings'
import HelpIcon from '@material-ui/icons/Help'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import EventIcon from '@material-ui/icons/Event'

import { Divider, ListItem, ListItemIcon } from '@material-ui/core'
import ListItemText from '@/hotfix/ListItemText'

import UserInfo from './UserInfo'

interface ItemProps {
  /**
   * 图标
   */
  icon: React.ReactElement<any>
  /**
   * 文字
   */
  text: string
  /**
   * 单击回调
   */
  onClick: () => void
}

const Item: React.FC<ItemProps> = ({ icon, text, onClick }) => (
  <ListItem button onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
)

const DividerS = muiStyled(Divider)({
  margin: '0 16px',
  height: 1.5,
})

const jump = (link: string) => () => navigate(link)

const DrawerContent: React.FC = () => {
  const user = useModel(userModel)
  const { LOG_OUT } = userModel

  const { customHome } = useModel(settingModel, ['customHome'])

  return (
    <>
      <UserInfo isLogIn={user.isLogIn} info={user.myInfo} />
      <DividerS />
      <Item icon={<HomeIcon />} text="主页" onClick={jump('/')} />
      {customHome !== 1 && (
        <Item icon={<EventIcon />} text="推荐" onClick={jump('/recommedation')} />
      )}
      {customHome !== 2 && (
        <Item icon={<TrendingUpIcon />} text="热门" onClick={jump('/hotTopics')} />
      )}
      {customHome !== 3 && (
        <Item icon={<FiberNewIcon />} text="新帖" onClick={jump('/newTopics')} />
      )}
      <Item icon={<AspectRatioIcon />} text="版面" onClick={jump('/boardList')} />
      {user.isLogIn && (
        <>
          {customHome !== 4 && <Item icon={<BookIcon />} text="关注" onClick={jump('/myFollow')} />}
          <Item icon={<SearchIcon />} text="搜索" onClick={jump('/search')} />
          <Item icon={<SpeakerNotesIcon />} text="私信" onClick={jump('/messageList')} />
        </>
      )}
      <Item icon={<PetsIcon />} text="足迹" onClick={jump('/history')} />
      <Item icon={<SettingsIcon />} text="设置" onClick={jump('/setting')} />
      <Item icon={<HelpIcon />} text="帮助" onClick={jump('/help')} />
      {user.isLogIn && (
        <>
          <Item icon={<ExitToAppIcon />} text="登出" onClick={LOG_OUT} />
        </>
      )}
    </>
  )
}

export default DrawerContent
