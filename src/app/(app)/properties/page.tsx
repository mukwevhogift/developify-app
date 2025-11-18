import { PropertyCard } from "@/components/properties/property-card"
import { properties } from "@/lib/data"

export default function PropertiesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Explore Properties</h1>
        <p className="text-muted-foreground">Find your next investment opportunity.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}
