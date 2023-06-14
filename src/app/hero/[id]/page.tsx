import { Carousel } from '@/components/Carousel';
import { IHeroData } from '@/models/heroes';

interface IProps {
  params: {
    id: string;
  };
}

async function getData(): Promise<{ data: IHeroData[] }> {
  const response = await fetch('http://localhost:3000/api/heroes');

  if (!response.ok) {
    throw new Error('Fail to get heroes');
  }

  return response.json();
}

export default async function Hero({ params: { id } }: IProps) {
  const response = await getData();

  return <Carousel heroes={response.data} activeId={id} />;
}
