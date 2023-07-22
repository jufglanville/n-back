import React from 'react';
import Image from 'next/image';

interface Props {
  lives: number;
  incorrect: number;
}

const Lives = ({ lives, incorrect }: Props) => {
  const remainingLives = Array.from({ length: lives - incorrect }).map(
    (e, i) => (
      <Image
        key={i}
        src="/../public/assets/heart.png"
        alt="heart"
        height={20}
        width={20}
      />
    )
  );

  return <div className="flex items-center gap-2 mb-5">{remainingLives}</div>;
};

export default Lives;
