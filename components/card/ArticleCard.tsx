import Link from 'next/link';
import Image from 'next/image';

interface NextLinkProps {
  href: string;
  title: string;
  publishDate: string;
  image: string;
  journalName: string;
  creators: [];
}

const ArticleCard = ({
  href,
  title,
  publishDate,
  image,
  journalName,
  creators,
}: NextLinkProps) => {
  const formatDate = (inputDate: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    };
    const formattedDate: string = new Date(inputDate).toLocaleDateString(
      'en-US',
      options,
    );
    return formattedDate;
  };

  return (
    <article className="h-full w-full">
      <Link aria-label="Brand Logo" href={href} className="flex flex-col gap-4">
        <figure className="min-w-full bg-indigo-50 overflow-hidden h-48 flex justify-center items-center">
          <Image
            src={image ? image : '/images/default_thumbnail.webp'}
            alt={title}
            className="w-52"
            width={500}
            height={500}
          />
        </figure>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="text-sm font-medium">
            {creators.map((creator: string, index: number) => (
              <>
                <span>
                  {creator.split(',')[1]} {creator.split(',')[0]}
                </span>
                {index < creators.length - 1 && ','}
              </>
            ))}
          </p>
          <p className="text-slate-900 text-sm">
            {formatDate(publishDate)}, {journalName}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
