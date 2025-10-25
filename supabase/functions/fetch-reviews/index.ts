import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const guestyToken = Deno.env.get('GUESTY_API_TOKEN');
    
    if (!guestyToken) {
      throw new Error('GUESTY_API_TOKEN not configured');
    }

    const url = new URL(req.url);
    const listingId = url.searchParams.get('listingId') || '677de2c078943a000f408dca';

    console.log(`Fetching reviews for listing: ${listingId}`);

    const response = await fetch(
      `https://open-api.guesty.com/v1/reviews?listingId=${listingId}`,
      {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'authorization': `Bearer ${guestyToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Guesty API error:', errorText);
      throw new Error(`Guesty API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(`Successfully fetched ${data.results?.length || 0} reviews`);

    return new Response(
      JSON.stringify(data),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching reviews:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: 'Failed to fetch reviews from Guesty API'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
