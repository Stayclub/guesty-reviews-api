import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertyNavProps {
  currentProperty: "the-drift" | "the-grande" | "the-magna" | "amphora-palms";
  onFilterChange: (filter: "all" | "airbnb") => void;
  currentFilter: "all" | "airbnb";
}

export const PropertyNav = ({ currentProperty, onFilterChange, currentFilter }: PropertyNavProps) => {
  const properties = [
    { id: "the-drift", name: "The Drift", path: "/" },
    { id: "the-grande", name: "The Grande", path: "/the-grande" },
    { id: "the-magna", name: "The Magna", path: "/the-magna" },
    { id: "amphora-palms", name: "Amphora Palms", path: "/amphora-palms" },
  ];

  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-4">
          <div className="flex gap-2 overflow-x-auto">
            {properties.map((property) => (
              <Link key={property.id} to={property.path}>
                <Button
                  variant={currentProperty === property.id ? "default" : "outline"}
                  className="whitespace-nowrap"
                >
                  {property.name}
                </Button>
              </Link>
            ))}
          </div>
          <Select value={currentFilter} onValueChange={(value) => onFilterChange(value as "all" | "airbnb")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reviews</SelectItem>
              <SelectItem value="airbnb">Airbnb Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  );
};
