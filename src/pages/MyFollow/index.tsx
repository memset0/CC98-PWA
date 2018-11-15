import React, { useState, useEffect } from 'react'
import { css } from 'emotion'

import TopicItem from '@/components/TopicItem'
import InfiniteList from '@/components/InfiniteList'

import { List, Paper, Tab, Tabs } from '@material-ui/core'

import { Theme, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import { getFollowBoardsTopics, getFollowUsersTopics } from '@/services/topic'
import { ITopic } from '@cc98/api'
import { getBoardNameById } from '@/services/board'

interface Props {
  classes: ClassNameMap
}
interface State {
  isLoading: boolean
  isEnd: boolean
  b_topics: ITopic[]
  b_from: number
  u_topics: ITopic[]
  u_from: number
}

const indexStyle = css`
  && {
    min-height: 90vh;
  }
`

const styles = (theme: Theme) => ({
  root: {
    color: theme.palette.primary.main,
  },
})

export default withStyles(styles)((props: Props) => {
  const { classes } = props
  const [state, setState] = useState<State>({
    isLoading: false,
    isEnd: false,
    b_topics: [],
    b_from: 0,
    u_topics: [],
    u_from: 0,
  })
  const [current, setCurrent] = useState('board')
  const { b_topics, u_topics, b_from, u_from, isEnd, isLoading } = state

  useEffect(() => {
    if (current === 'board') {
      getFollowBTopics()
    } else {
      getFolloweeTopics()
    }
  }, [])

  const changeFocus = () => {
    if (current === 'board') {
      getFolloweeTopics()
    } else {
      getFollowBTopics()
    }
    setCurrent(prevCurrent => (prevCurrent === 'board' ? 'user' : 'board'))
  }

  const getFollowBTopics = async () => {
    setState({ ...state, isLoading: true })

    const topicsTry = await getFollowBoardsTopics(b_from)
    topicsTry.map(async topicList => {
      // FIXME
      topicList.map(async topic => (topic.boardName = await getBoardNameById(topic.boardId)))
      setState(prevState => ({
        ...prevState,
        b_topics: prevState.b_topics.concat(topicList),
        b_from: prevState.b_from + topicList.length,
        isLoading: false,
        isEnd: topicList.length !== 20,
      }))
    })
  }

  const getFolloweeTopics = async () => {
    setState({ ...state, isLoading: true })
    const topicsTry = await getFollowUsersTopics(u_from)
    topicsTry.fail().succeed(async topicList => {
      // FIXME
      topicList.map(async topic => (topic.boardName = await getBoardNameById(topic.boardId)))
      setState(prevState => ({
        ...prevState,
        u_topics: prevState.u_topics.concat(topicList),
        u_from: prevState.u_from + topicList.length,
        isLoading: false,
        isEnd: topicList.length !== 20,
      }))
    })
  }

  const topics = current === 'board' ? b_topics : u_topics

  return (
    <div>
      <Paper className={indexStyle}>
        <Tabs fullWidth value={current} onChange={changeFocus}>
          <Tab classes={{ root: classes.root }} value="board" label="关注版面" />
          <Tab classes={{ root: classes.root }} value="user" label="关注用户" />
        </Tabs>

        <InfiniteList
          isLoading={isLoading}
          isEnd={isEnd}
          callback={current === 'board' ? getFollowBTopics : getFolloweeTopics}
        >
          <List>
            {topics.map(topic => (
              <TopicItem key={topic.id} data={topic} place={'follow'} />
            ))}
          </List>
        </InfiniteList>
      </Paper>
    </div>
  )
})
