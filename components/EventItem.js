import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

export default function EventItem({ e }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            e.image
              ? e.image.formats.thumbnail.url
              : '/images/event-default.png'
          }
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>{new Date(e.date).toLocaleDateString('en-UK')}</span>
        <h3>{e.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${e.slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  );
}
