interface Props {
  gameRound: GameRound;
  index: number;
}

export const GameRoundResult = ({ gameRound, index }: Props) => {
  if (index < 2) {
    return (
      <tr key={index} className="text-center text-sm sm:text-base">
        <td>{gameRound.value}</td>
        <td>-</td>
      </tr>
    );
  }

  if (gameRound.userCorrect === null) return null;

  return (
    <tr key={index} className="text-center text-sm sm:text-base">
      <td>
        {index - 1}. {gameRound.value}
      </td>
      <td>{gameRound.userCorrect ? '✅' : '❌'}</td>
    </tr>
  );
};
