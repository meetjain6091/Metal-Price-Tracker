import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MetalTileProps {
  id: string;
  name: string;
  symbol: string;
  refreshTrigger: number;
}

export default function MetalTile({
  name,
  symbol,
  refreshTrigger,
}: MetalTileProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [price, setPrice] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(false);

    try {
      await new Promise((resolve, reject) => {
        const randomDelay = Math.floor(Math.random() * 3000) + 1000;
        setTimeout(() => {
          if (Math.random() < 0.1) {
            reject(new Error("Network timeout"));
          } else {
            resolve("Success");
          }
        }, randomDelay);
      });

      const randomPrice = "₹" + (Math.random() * 5000 + 1000).toFixed(2);
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setPrice(randomPrice);
      setTime(currentTime);
    } catch (err) {
      console.error(`Failed to fetch ${name}:`, err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.tile}
      onPress={() =>
        router.push({ pathname: "/details", params: { name, symbol } })
      }
      disabled={isLoading}
    >
      <Text style={styles.metalName}>{name}</Text>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Fetching...</Text>
        </View>
      ) : error ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.errorText}>Network Error.</Text>
          <Text style={styles.retryText}>Pull down to retry</Text>
        </View>
      ) : (
        <>
          <Text style={styles.price}>{price} /g</Text>
          <Text style={styles.time}>{time}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: "white",
    margin: 8,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  metalName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  loaderContainer: { marginTop: 10, alignItems: "center" },
  loadingText: { fontSize: 12, color: "#666", marginTop: 5 },
  price: {
    fontSize: 16,
    color: "#27ae60",
    marginVertical: 8,
    fontWeight: "600",
  },
  time: { fontSize: 12, color: "#888" },
  errorText: { color: "red", marginTop: 5, fontWeight: "bold" },
  retryText: { fontSize: 10, color: "#999", marginTop: 2 },
});
