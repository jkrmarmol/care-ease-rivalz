import React from "react";
import { StyleSheet, View, useWindowDimensions, Image } from "react-native";
import PagerView from "react-native-pager-view";

export default function ParallaxAds() {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        width: width,
        height: 80,
        marginVertical: 20,
      }}
    >
      <PagerView style={styles.viewPager} initialPage={0}>
        <View style={styles.page} key="1">
          <Image
            source={{
              uri: "https://bloximages.chicago2.vip.townnews.com/tucson.com/content/tncms/assets/v3/editorial/2/d3/2d3c5b92-5716-11e9-b4fc-5370e3a6091c/5ca6658521d53.image.jpg?resize=1200%2C877",
            }}
            style={{
              resizeMode: "cover",
              width: (95 / 100) * width,
              height: 80,
              overflow: "hidden",
              borderRadius: 12,
            }}
          />
        </View>
        <View style={styles.page} key="2">
          <Image
            source={{
              uri: "https://www.bannerhealth.com/-/media/images/project/bh/hero-images/services/research/research-hero-image.ashx",
            }}
            style={{
              resizeMode: "cover",
              width: (95 / 100) * width,
              height: 80,
              overflow: "hidden",
              borderRadius: 12,
            }}
          />
        </View>
        <View style={styles.page} key="3">
          <Image
            source={{
              uri: "https://www.swg.com/can/wp-content/uploads/sites/38/2019/04/Hospital-Case-Study-Banner-Daniel.png",
            }}
            style={{
              resizeMode: "cover",
              width: (95 / 100) * width,
              height: 80,
              overflow: "hidden",
              borderRadius: 12,
            }}
          />
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});
