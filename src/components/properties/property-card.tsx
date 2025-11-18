import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Property } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

export function PropertyCard({ property }: { property: Property }) {
  const fundingPercentage = (property.currentAmount / property.targetAmount) * 100;
  const image = PlaceHolderImages.find(p => p.id === property.images[0]);

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
      <CardHeader className="relative h-48 w-full p-0">
        <Link href={`/properties/${property.id}`} className="absolute inset-0">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={property.name}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          ) : (
            <div className="h-full w-full bg-muted"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </Link>
        <Badge className="absolute right-3 top-3 border-none bg-primary/80 text-primary-foreground backdrop-blur-sm">{property.investmentLevel}</Badge>
        <div className="absolute bottom-3 left-3">
            <h3 className="font-headline text-lg font-semibold text-white">{property.name}</h3>
            <p className="text-sm text-gray-300">{property.location}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Est. ROI</span>
            <span className="font-semibold text-green-400">{property.roi}%</span>
          </div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="font-semibold text-primary">{property.status}</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>Funding Progress</span>
            <span>{fundingPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={fundingPercentage} className="h-2" />
          <div className="mt-1 text-right text-xs text-muted-foreground">
            Target: R{property.targetAmount.toLocaleString()}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full font-bold">
            <Link href={`/properties/${property.id}`}>
                View Details <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
