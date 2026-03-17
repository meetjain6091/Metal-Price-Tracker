import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function DetailsPage() {
  const { name, symbol } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchDetailedData();
  }, []);

  const fetchDetailedData = async () => {
    setIsLoading(true);
    setError(false);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.1) reject(new Error("Failed to fetch details"));
          resolve("Success");
        }, 1500);
      });

      setDetails({
        currentPrice: "₹" + (Math.random() * 5000 + 1000).toFixed(2),
        prevClose: "₹" + (Math.random() * 5000 + 1000).toFixed(2),
        prevOpen: "₹" + (Math.random() * 5000 + 1000).toFixed(2),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {name} ({symbol})
      </Text>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Fetching Detailed Stats...</Text>
        </View>
      ) : error ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.errorText}>Whoops! Something went wrong.</Text>
          <Button title="Try Again" onPress={fetchDetailedData} />
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.statRow}>
            Current Price:{" "}
            <Text style={styles.value}>{details?.currentPrice}</Text>
          </Text>
          <Text style={styles.statRow}>
            Previous Close:{" "}
            <Text style={styles.value}>{details?.prevClose}</Text>
          </Text>
          <Text style={styles.statRow}>
            Previous Open: <Text style={styles.value}>{details?.prevOpen}</Text>
          </Text>
          <Text style={styles.statRow}>
            Date: <Text style={styles.value}>{details?.date}</Text>
          </Text>
          <Text style={styles.statRow}>
            Time Fetched: <Text style={styles.value}>{details?.time}</Text>
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#666" },
  errorText: { fontSize: 16, color: "red", marginBottom: 15 },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },
  statRow: { fontSize: 16, marginBottom: 15, color: "#555" },
  value: { fontWeight: "bold", color: "#000" },
});
