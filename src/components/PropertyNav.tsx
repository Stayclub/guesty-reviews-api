import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PropertyNavProps {
  currentProperty: "the-drift" | "the-grande" | "the-magna" | "amphora-palms";
}

export const PropertyNav = ({ currentProperty }: PropertyNavProps) => {
  const properties = [
    { id: "the-drift", name: "The Drift", path: "/" },
    { id: "the-grande", name: "The Grande", path: "/the-grande" },
    { id: "the-magna", name: "The Magna", path: "/the-magna" },
    { id: "amphora-palms", name: "Amphora Palms", path: "/amphora-palms" },
  ];

  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-2 py-4 overflow-x-auto">
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
      </div>
    </nav>
  );
};
