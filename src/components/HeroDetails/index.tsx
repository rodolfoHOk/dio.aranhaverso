import Image from 'next/image';
import { Quicksand } from 'next/font/google';

import { spiderManFont } from '@/fonts';
import { IHeroData } from '@/models/heroes';
import './HeroDetails.styles.css';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

interface IProps {
  data: IHeroData;
}

export default function HeroDetails({ data }: IProps) {
  const { id, name, universe, details } = data;

  return (
    <div className={`${quicksand.className}`}>
      <h1 className={`${spiderManFont.className} hero-title`}>
        {name} (Universo-{universe})
      </h1>

      <div className="hero-details">
        <h2 className="hero-subtitle">Informações</h2>

        <table className="hero-table">
          <tbody>
            <tr>
              <td className="label">Nome completo</td>
              <td>{details.fullName}</td>
            </tr>

            <tr>
              <td className="label">Data nascimento</td>
              <td>{new Date(details.birthday).toLocaleDateString('pt-BR')}</td>
            </tr>

            <tr>
              <td className="label">Terra Natal</td>
              <td>{details.homeland}</td>
            </tr>

            <tr>
              <td className="label">Altura</td>
              <td>{details.height.toFixed(2)} m</td>
            </tr>

            <tr>
              <td className="label">Peso</td>
              <td>{details.weight.toFixed(2)} kg</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="hero-details">
        <h2 className="hero-subtitle">Primeira Aparição</h2>

        <Image
          src={`/spiders/${id}-comic-book.png`}
          alt={`Primeira aparição nos quadrinhos de ${name} no universo ${universe}`}
          width={80}
          height={122}
        />
      </div>
    </div>
  );
}
