import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { IReviewCard } from "@/src/data/reviews";

const ReviewCard = ({
  review,
  author,
  authorImage,
  date,
  rating,
}: IReviewCard) => {
  return (
    <article className="p-4 border-divider border rounded-2xl shadow-xs h-auto flex flex-col gap-8">
      <p className="leading-relaxed text-text-secondary"> {review} </p>

      <section className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
            <Image
              src={authorImage}
              alt={author}
              width={40}
              height={40}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{author}</span>
            <span className="text-xs font-light text-text-secondary">
              {date}
            </span>
          </div>
        </div>

        <div className="text-xs items-center flex gap-2">
          <span className="text-primary-dark">
            <Star size={18} />
          </span>
          <span>{rating}</span>
        </div>
      </section>
    </article>
  );
};

export default ReviewCard;
