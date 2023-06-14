'use client';

import { spiderManFont } from '@/fonts';
import { IHeroData } from '@/models/heroes';

import './HeroList.styles.css';
import { HeroPicture } from '../HeroPicture';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface IProps {
  heroes: IHeroData[];
}

export function HeroList({ heroes }: IProps) {
  return (
    <>
      <motion.h1
        className={`${spiderManFont.className} title`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        Personagens
      </motion.h1>

      <motion.section
        className="heroes"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {heroes.map((hero) => (
          <motion.div
            key={hero.id}
            className={`imageContainer ${hero.id}`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 0.75 }}
          >
            <Link href={`/hero/${hero.id}`}>
              <HeroPicture hero={hero} />
            </Link>
          </motion.div>
        ))}
      </motion.section>
    </>
  );
}
