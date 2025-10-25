import { Star, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ReviewStatsProps {
  totalReviews: number;
  averageRating: number;
}

export const ReviewStats = ({ totalReviews, averageRating }: ReviewStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <Card className="p-6 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-0 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Star className="h-6 w-6 fill-primary-foreground" />
          </div>
          <div>
            <p className="text-primary-foreground/80 text-sm font-medium">Average Rating</p>
            <p className="text-3xl font-bold">{averageRating.toFixed(1)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-accent to-accent/90 text-accent-foreground border-0 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <p className="text-accent-foreground/80 text-sm font-medium">Total Reviews</p>
            <p className="text-3xl font-bold">{totalReviews}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
