import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';

export default function EventPage({ e }) {
  const deleteEvent = (e) => {
    console.log('delete');
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${e.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>{new Date(e.date).toLocaleDateString('en-UK')}</span>
        <h1>{e.name}</h1>
        {e.image && (
          <div className={styles.image}>
            <Image src={e.image.formats.medium.url} width={960} height={600} />
          </div>
        )}

        <h3>Description:</h3>
        <p>{e.description}</p>
        <h3>Venue: {e.venue}</h3>
        <p>{e.address}</p>
        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map((e) => ({ params: { slug: e.slug } }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return { props: { e: events[0] }, revalidate: 1 };
}
