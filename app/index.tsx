import { useCallback, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import MetalTile from "../components/MetalTile";

const metalsList = [
  { id: "1", symbol: "XAU", name: "Gold" },
  { id: "2", symbol: "XAG", name: "Silver" },
  { id: "3", symbol: "XPT", name: "Platinum" },
  { id: "4", symbol: "XPD", name: "Palladium" },
];

export default function LandingPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshKey((prev) => prev + 1);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={metalsList}
        numColumns={2}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#007bff"]}
          />
        }
        renderItem={({ item }) => (
          <MetalTile
            id={item.id}
            name={item.name}
            symbol={item.symbol}
            refreshTrigger={refreshKey}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 10 },
});
