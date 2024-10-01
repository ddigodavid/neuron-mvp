/*global chrome*/
chrome.runtime.onInstalled.addListener(async () => {
  setInterval(() => console.log("Ping"), 30000);
  let db, eventSource;
  const request = indexedDB.open("NeuronOS", 1);

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objectStore = db.createObjectStore("messages", {
      keyPath: "id",
      autoIncrement: true,
    });
    objectStore.createIndex("id", "id", { unique: true });
    objectStore.createIndex("uuid", "uuid", { unique: true });
    objectStore.createIndex("isRead", "isRead", { unique: false });
  };

  request.onerror = () => {
    console.log("Error opening database");
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    eventSource = new EventSource("http://localhost:3000/api/messages");

    eventSource.onmessage = async (event) => {
      const message = JSON.parse(event.data);

      const transaction = db.transaction(["messages"], "readwrite");
      const objectStore = transaction.objectStore("messages");

      objectStore.put({ ...message, isRead: false });

      chrome.action.setBadgeText({ text: " " });
      chrome.action.setBadgeBackgroundColor({
        color: "red",
      });
    };
  };
});
