import { useEffect, useState } from "react";
import Message from "./components/message";
import { MessageSchema } from "./types/message";

let db: IDBDatabase;

export default function MessagesList() {
  const [messages, setMessages] = useState<MessageSchema[]>([]);

  useEffect(() => {
    try {
      const open = indexedDB.open("NeuronOS", 1);

      open.onerror = () => {
        console.error("Why didn't you allow my web app to use IndexedDB?!");
      };

      open.onsuccess = function () {
        db = this.result;
        const transaction = db.transaction(["messages"], "readonly");
        const store = transaction.objectStore("messages");

        const allMessages = store.getAll();

        allMessages.onsuccess = () => setMessages(allMessages.result);
      };
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const handleMarkAsRead = (uuid: string) => {
    try {
      const transaction = db.transaction(["messages"], "readwrite");
      const store = transaction.objectStore("messages");
      const index = store.index("uuid");

      const request = index.get(uuid);

      request.onsuccess = () => {
        const message = request.result;
        message.isRead = true;

        const updateRequest = store.put(message);

        updateRequest.onerror = () => {
          // Handle errors!
        };

        updateRequest.onsuccess = () => {
          const updatedMessages = messages?.map((msg) =>
            msg.uuid === uuid ? message : msg
          );

          setMessages(updatedMessages);

          chrome.action.setBadgeText({ text: "" });
        };
      };
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="space-y-1">
      {!messages.length && (
        <div className="text-center">Waiting for messages...</div>
      )}
      {!!messages.length &&
        messages.map((message) => (
          <Message
            key={message.uuid}
            message={message}
            onMarkAsRead={handleMarkAsRead}
          />
        ))}
    </div>
  );
}
