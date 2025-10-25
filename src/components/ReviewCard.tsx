import { Star, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ReviewCardProps {
  review: {
    _id: string;
    guestName?: string;
    rating?: number;
    publicReview?: string;
    createdAt: string;
    channelId?: string;
    listing?: {
      nickname?: string;
    };
    rawReview?: {
      overall_rating: number;
      public_review?: string;
      reviewer_id?: string;
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

  const getChannelName = (channelId: string | undefined) => {
    if (!channelId) return null;
    
    const channelMap: Record<string, string> = {
      'airbnb2': 'Airbnb',
      'airbnb': 'Airbnb',
      'bookingcom': 'Booking.com',
      'booking': 'Booking.com',
      'vrbo': 'VRBO',
      'expedia': 'Expedia',
    };
    
    return channelMap[channelId.toLowerCase()] || channelId;
  };

  const guestName = review.guestName || `Guest ${review.rawReview?.reviewer_id?.slice(-6) || 'Unknown'}`;
  const rating = review.rawReview?.overall_rating || review.rating || 0;
  const publicReview = review.rawReview?.public_review || review.publicReview;
  const channelName = getChannelName(review.channelId);

  return (
    <Card className="p-6 bg-gradient-to-b from-card to-card/95 border-border/50 hover:shadow-[var(--shadow-hover)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg text-foreground">
                {guestName}
              </h3>
              {channelName && (
                <Badge variant="secondary" className="text-xs">
                  <Building2 className="h-3 w-3 mr-1" />
                  {channelName}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {formatDate(review.createdAt)}
            </p>
          </div>
          <div className="flex gap-0.5">
            {renderStars(rating)}
          </div>
        </div>

        {publicReview && (
          <p className="text-foreground/90 leading-relaxed">
            {publicReview}
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
