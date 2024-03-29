interface Props {
  lives: number;
}

export const Lives = ({ lives }: Props) => {
  const remainingLives = Array.from({ length: lives }).map((el, idx) => (
    <p key={idx}>❤️</p>
  ));

  return <div className="flex items-center gap-2 mb-5">{remainingLives}</div>;
};
