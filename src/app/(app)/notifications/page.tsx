import { notifications } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from "lucide-react"

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Stay updated with your account and investment activities.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {notifications.map(notification => (
              <li key={notification.id} className={`p-6 ${!notification.read ? 'bg-card' : 'bg-background/50'}`}>
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {!notification.read && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{notification.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
