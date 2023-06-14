'use client';

import { DragEvent, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { HeroDetails } from '../HeroDetails';
import { HeroPicture } from '../HeroPicture';
import { IHeroData } from '@/models/heroes';
import './Carousel.styles.css';

enum EPosition {
  FRONT = 0,
  MIDDLE = 1,
  BACK = 2,
}

interface IProps {
  heroes: IHeroData[];
  activeId: string;
}

export function Carousel({ heroes, activeId }: IProps) {
  const [visibleHeroes, setVisibleHeroes] = useState<IHeroData[] | null>(null);

  const [activeHeroIndex, setActiveHeroIndex] = useState(
    heroes.findIndex((hero) => hero.id === activeId) - 1
  );

  const [startInteractionPosition, setStartInteractionPosition] =
    useState<number>(0);

  function handleChangeActiveHeroIndex(newDirection: number) {
    setActiveHeroIndex((previousIndex) => previousIndex + newDirection);
  }

  function handleDragStart(event: DragEvent<HTMLDivElement>) {
    setStartInteractionPosition(event.clientX);
  }

  function handleDragEnd(event: DragEvent<HTMLDivElement>) {
    if (!startInteractionPosition) {
      return;
    }

    const endInteractionPosition = event.clientX;
    const diffPosition = endInteractionPosition - startInteractionPosition;

    const newPosition = diffPosition > 0 ? -1 : 1;
    handleChangeActiveHeroIndex(newPosition);
  }

  const transitionAudio = useMemo(() => new Audio('/songs/transition.mp3'), []);

  const voicesAudio: Record<string, HTMLAudioElement> = useMemo(
    () => ({
      'spider-man-616': new Audio('/songs/spider-man-616.mp3'),
      'mulher-aranha-65': new Audio('/songs/mulher-aranha-65.mp3'),
      'spider-man-1610': new Audio('/songs/spider-man-1610.mp3'),
      'sp-dr-14512': new Audio('/songs/sp-dr-14512.mp3'),
      'spider-ham-8311': new Audio('/songs/spider-ham-8311.mp3'),
      'spider-man-90214': new Audio('/songs/spider-man-90214.mp3'),
      'spider-man-928': new Audio('/songs/spider-man-928.mp3'),
    }),
    []
  );

  useEffect(() => {
    if (!visibleHeroes) {
      return;
    }

    transitionAudio.play();

    const voiceAudio = voicesAudio[visibleHeroes[EPosition.MIDDLE].id];
    if (voiceAudio) {
      voiceAudio.volume = 0.3;
      voiceAudio.play();
    }
  }, [visibleHeroes, transitionAudio, voicesAudio]);

  useEffect(() => {
    const htmlEl = document.querySelector('html');

    if (!htmlEl || !visibleHeroes) {
      return;
    }

    const currentHeroId = visibleHeroes[EPosition.MIDDLE].id;
    htmlEl.style.backgroundImage = `url("/spiders/${currentHeroId}-background.png")`;
    htmlEl.classList.add('hero-page');

    return () => {
      htmlEl.classList.remove('hero-page');
    };
  }, [visibleHeroes]);

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

  return (
    <div className="carousel-container">
      <div className="carousel">
        <div
          className="carousel-wrapper"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <AnimatePresence mode="popLayout">
            {visibleHeroes.map((hero, position) => (
              <motion.div
                key={hero.id}
                className="carousel-hero"
                initial={{ x: -1500, scale: 0.75 }}
                animate={{ x: 0, ...getItemStyles(position) }}
                exit={{ x: 0, left: '-20%', opacity: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <HeroPicture hero={hero} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        className="carousel-details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <HeroDetails data={visibleHeroes[EPosition.MIDDLE]} />
      </motion.div>
    </div>
  );
}

function getItemStyles(position: EPosition) {
  if (position === EPosition.FRONT) {
    return {
      filter: 'blur(10px)',
      scale: 1.2,
      zIndex: 3,
    };
  }

  if (position === EPosition.MIDDLE) {
    return {
      left: 300,
      scale: 0.8,
      top: '-10px',
      zIndex: 2,
    };
  }

  return {
    filter: 'blur(10px)',
    scale: 0.6,
    left: 160,
    opacity: 0.8,
    top: '-20%',
  };
}
