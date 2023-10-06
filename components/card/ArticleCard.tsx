import Link from 'next/link';
import Image from 'next/image';

interface NextLinkProps {
  href: string;
  title: string;
  topic: string;
  image: string;
  journalName: string;
}

const ArticleCard = ({
  href,
  title,
  topic,
  image,
  journalName,
}: NextLinkProps) => {
  return (
    <article className="h-full w-full">
      <Link aria-label="Brand Logo" href={href} className="flex flex-col gap-4">
        <figure className="min-w-full bg-indigo-50 overflow-hidden h-48 flex justify-center items-center">
          <Image
            src={image ? image : '/images/default_thumbnail.svg'}
            alt={title}
            className="w-52"
            width={500}
            height={500}
          />
        </figure>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-medium line-clamp-2">{title}</h3>
          <p className="text-sm text-slate-500">
            in{' '}
            <span className="font-semibold">
              {topic.length > 0 ? topic[0] : journalName}
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
