import CheckIcon from "@mui/icons-material/Check";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { MessageSchema } from "../types/message";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function Message({
  message: { uuid, title, content, categories, isRead },
  onMarkAsRead,
}: {
  message: MessageSchema;
  onMarkAsRead: (uuid: string) => void;
}) {
  const [read, setRead] = useState(isRead);

  const handleMarkAsRead = () => {
    setRead(true);
    onMarkAsRead(uuid);
  };

  return (
    <Card>
      <CardContent className="!py-2">
        <div className="space-y-2">
          <div className="grid grid-cols-2">
            <div className="font-semibold">{title}</div>
            <div className="w-full">
              {!read && (
                <Button
                  variant="outlined"
                  onClick={handleMarkAsRead}
                  size="small"
                  className="ml-auto"
                >
                  Mark as Read
                </Button>
              )}
              {read && <CheckIcon />}
            </div>
          </div>
          <div>{content}</div>
          <div className="space-x-2 flex justify-end">
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                size="small"
                variant="outlined"
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
