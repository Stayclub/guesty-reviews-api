import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ReviewCard } from "@/components/ReviewCard";
import { ReviewStats } from "@/components/ReviewStats";
import { Loader2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("fetch-reviews", {
        body: {},
      });

      if (error) {
        console.error("Error fetching reviews:", error);
        throw error;
      }

      return data;
    },
    retry: 1,
  });

  if (error) {
    toast({
      title: "Error loading reviews",
      description: "Failed to fetch reviews from the server. Please try again later.",
      variant: "destructive",
    });
  }

  const reviews = data?.results || [];
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / totalReviews
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-2xl mb-6 backdrop-blur-sm">
            <Star className="h-8 w-8 fill-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Guest Reviews</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            See what our guests are saying about their experience
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          <>
            <ReviewStats totalReviews={totalReviews} averageRating={averageRating} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review: any) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center p-4 bg-muted rounded-2xl mb-4">
              <Star className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">No reviews yet</h2>
            <p className="text-muted-foreground">Be the first to leave a review!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
