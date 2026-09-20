export const Words = ({ text }) =>
  text.split(' ').flatMap((word, i) =>
    i === 0
      ? [<span className="rv-word" style={{ '--i': i }} key={i}>{word}</span>]
      : [' ', <span className="rv-word" style={{ '--i': i }} key={i}>{word}</span>]
  );