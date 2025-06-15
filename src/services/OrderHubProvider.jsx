import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export const OrderHubContext = createContext();

export const OrderHubProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const connectionRef = useRef(null);

  useEffect(() => {
    const tableId = localStorage.getItem("tableId");
    if (!tableId) {
      console.error("Geen tableId gevonden. Kan geen groep joinen.");
      setLoading(false);
      return;
    }

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7117/orderhub", {
        transport: signalR.HttpTransportType.WebSockets,
        withCredentials: false,
      })
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    connection.on("ReceiveOrderUpdate", (orderUpdate) => {
      setOrders((prevOrders) => {
        const index = prevOrders.findIndex(o => o.orderId === orderUpdate.orderId);
        const formattedOrder = {
          orderId: orderUpdate.orderId,
          status: orderUpdate.status,
          items: orderUpdate.items.map(item => ({
            name: item.dishName,
            quantity: item.quantity,
            status: orderUpdate.status,
          }))
        };

        if (index >= 0) {
          const updated = [...prevOrders];
          updated[index] = formattedOrder;
          return updated;
        } else {
          return [...prevOrders, formattedOrder];
        }
      });
      setLoading(false); // Na eerste update, klaar met laden
    });

    connection.start()
      .then(() => {
        console.log("Verbonden met SignalR-hub.");
        return connection.invoke("JoinTableGroup", tableId);
      })
      .then(() => {
        console.log("Groep succesvol gejoined");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fout bij starten van SignalR of joinen:", err);
        setLoading(false);
      });

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
        console.log("SignalR verbinding wordt afgesloten.");
      }
    };
  }, []);

  return (
    <OrderHubContext.Provider value={{ orders, loading }}>
      {children}
    </OrderHubContext.Provider>
  );
};

// Custom hook om context makkelijker te gebruiken
export const useOrders = () => {
  const context = useContext(OrderHubContext);
  if (!context) {
    throw new Error("useOrders moet gebruikt worden binnen een OrderHubProvider");
  }
  return context;
};
