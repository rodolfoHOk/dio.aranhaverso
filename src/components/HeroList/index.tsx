import { spiderManFont } from '@/fonts';
import { IHeroData } from '@/models/heroes';

import './HeroList.styles.css';
import { HeroPicture } from '../HeroPicture';

interface IProps {
  heroes: IHeroData[];
}

export function HeroList({ heroes }: IProps) {
  return (
    <>
      <h1 className={`${spiderManFont.className} title`}>Personagens</h1>

      <section className="heroes">
        {heroes.map((hero) => (
          <div key={hero.id} className={`imageContainer ${hero.id}`}>
            <HeroPicture hero={hero} />
          </div>
        ))}
      </section>
    </>
  );
}
