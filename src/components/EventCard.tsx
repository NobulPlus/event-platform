import Link from 'next/link';
   import Image from 'next/image';
   import type { Event } from '@/lib/data';

   interface EventCardProps {
     event: Event;
   }

   export default function EventCard({ event }: EventCardProps) {
     return (
       <div>
         <Image
           src={event.image}
           alt={event.title}
           width={300}
           height={200}
           className="object-cover"
         />
         <h2>{event.title}</h2>
         <p>{event.date}</p>
         <p>{event.location}</p>
         <Link href={`/events/${event.id}`}>View Details</Link>
       </div>
     );
   }