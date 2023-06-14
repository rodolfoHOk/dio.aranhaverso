'use client';

import { IHeroData } from '@/models/heroes';
import HeroDetails from '../HeroDetails';
import './Carousel.styles.css';
import { useEffect, useState } from 'react';
import { HeroPicture } from '../HeroPicture';

interface IProps {
  heroes: IHeroData[];
  activeId: string;
}

export function Carousel({ heroes, activeId }: IProps) {
  const [visibleHeroes, setVisibleHeroes] = useState<IHeroData[] | null>(null);

  const [activeHeroIndex, setActiveHeroIndex] = useState(
    heroes.findIndex((hero) => hero.id === activeId)
  );

  useEffect(() => {
    const items = [...heroes];

    const indexInArrayScope =
      ((activeHeroIndex % items.length) + items.length) % items.length;

    const visibleHeroesToSet = [...items, ...items].slice(
      indexInArrayScope,
      indexInArrayScope + 3
    );

    setVisibleHeroes(visibleHeroesToSet);
  }, [heroes, activeHeroIndex]);

  if (!visibleHeroes) {
    return null;
  }

  function handleChangeActiveHeroIndex(newDirection: number) {
    setActiveHeroIndex((previousIndex) => previousIndex + newDirection);
  }

  return (
    <div className="carousel-container">
      <div className="carousel">
        <div
          className="carousel-wrapper"
          onClick={() => handleChangeActiveHeroIndex(1)}
        >
          {visibleHeroes.map((hero) => (
            <div key={hero.id} className="carousel-hero">
              <HeroPicture hero={hero} />
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-details">
        <HeroDetails data={heroes[activeHeroIndex]} />
      </div>
    </div>
  );
}
