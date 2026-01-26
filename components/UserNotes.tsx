"use client";

import { useEffect, useState } from "react";
import { getUserNotes } from "@/lib/FecthNotes";
import { NotesType } from "@/stores/NotesStore";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { MessageSquareText } from "lucide-react";
import { UserNotesCard } from "./UserCard";

export const UserNotes = () => {
  const [notes, setNotes] = useState<NotesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handle = async () => {
      try {
        const data = await getUserNotes();
        setNotes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    handle();
  }, []);

  if (loading) {
    return (
      <Card className="border border-border bg-card/80 backdrop-blur">
        <CardContent className="p-6 text-center text-muted-foreground">
          Loading notes...
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border border-border bg-card/80 backdrop-blur">
        <CardContent className="p-6 text-center text-muted-foreground">
          {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-border bg-card/80 backdrop-blur shadow-md">
      <CardHeader className="flex flex-row items-center gap-2">
        <MessageSquareText className="text-blue-600" />
        <CardTitle>User Notes</CardTitle>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-105 pr-4">
          <div className="grid gap-4">
            {notes.map((note, idx) => (
              <UserNotesCard key={idx} notes={note}/>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
