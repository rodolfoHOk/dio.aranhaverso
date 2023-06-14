import { HeroList } from '@/components/HeroList';
import { IHeroData } from '@/models/heroes';

import './Home.styles.css';

async function getData(): Promise<{ data: IHeroData[] }> {
  const response = await fetch('http://localhost:3000/api/heroes');

  if (!response.ok) {
    throw new Error('Fail to get heroes');
  }

  return response.json();
}

export default async function Home() {
  const response = await getData();

  return (
    <main className="main">
      <HeroList heroes={response.data} />
    </main>
  );
}
