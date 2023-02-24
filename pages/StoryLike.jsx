// import withProfiler from './withProfiler';

const styles = {
  button: {
    width: '60px',
    'marginRight': '20px',
  },
}

export const StoryLike = ({ story, onToggle }) => {
  return (
    <li>
      <button
        style={styles.button}
        onClick={(e) => onToggle()}
      >
        {story.likes} ❤️
      </button>
      <a href={story.url}>
        {story.name}
      </a>
    </li>
  );
}