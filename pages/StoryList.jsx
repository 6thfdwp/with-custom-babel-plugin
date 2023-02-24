import { useState, useEffect } from 'react'

import { StoryLike } from './StoryLike'

const randomLikes = () => Math.ceil(Math.random() * 100);
const data = [
  {
    name: 'React introduction',
    url: 'http://bit.ly/2pX7HNn',
    likes: randomLikes(),
  },
  {
    name: 'Element creation and JSX',
    url: 'http://bit.ly/2qGbw8S',
    likes: randomLikes(),
  },
  {
    name: 'Instances and reconciliation',
    url: 'http://bit.ly/2q4A746',
    likes: randomLikes(),
  },
  {
    name: 'Components and state',
    url: 'http://bit.ly/2rE16nh',
    likes: randomLikes(),
  },
  {
    name: 'Commit to mutate DOM elements ',
    url: 'http://bit.ly/2qCOejH',
    likes: randomLikes(),
  },

];

const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve(data) }, 50)
  })
}
const styles = {
  ul: {
    'listStyleType': 'none',
    'padding': 0,
  },
}
export const StoryList =  () => {
  const [stories, setStories] = useState([])
  useEffect(() => {
    fetchData().then(data => setStories(data))
  }, [])

  const handleLike = i => {
    const updatedStory = { ...stories[i], likes: stories[i].likes + 1 }
    setStories([...stories.slice(0, i), updatedStory, ...stories.slice(i + 1)])
  }
  return (
    <ul style={styles.ul}>
      {stories.map((s, i) => {
        return <StoryLike key={s.url} story={s} onToggle={() => handleLike(i)} />;
      })}
    </ul>
  //  <button onClick={(e) => handleAdd()}>Add</button>
  )
}

// export default withProfiler('StoryList', StoryList)