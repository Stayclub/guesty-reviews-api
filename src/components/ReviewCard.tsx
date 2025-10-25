import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ReviewCardProps {
  review: {
    _id: string;
    guestName: string;
    rating: number;
    publicReview?: string;
    createdAt: string;
    listing?: {
      nickname?: string;
    };
  };
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? 'fill-accent text-accent'
            : 'fill-muted text-muted'
        }`}
      />
    ));
  };

  return (
    <Card className="p-6 bg-gradient-to-b from-card to-card/95 border-border/50 hover:shadow-[var(--shadow-hover)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground mb-1">
              {review.guestName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {formatDate(review.createdAt)}
            </p>
          </div>
          <div className="flex gap-0.5">
            {renderStars(review.rating)}
          </div>
        </div>

        {review.publicReview && (
          <p className="text-foreground/90 leading-relaxed">
            {review.publicReview}
          </p>
        )}

        {review.listing?.nickname && (
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              Property: <span className="font-medium text-foreground/70">{review.listing.nickname}</span>
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
