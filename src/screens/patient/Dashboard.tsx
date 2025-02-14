import { ScrollView, useWindowDimensions, View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Services from "../../components/patient/home/Services";
import ParallaxAds from "../../components/patient/home/ParallaxAds";

export default function Dashboard() {
  const { width } = useWindowDimensions();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <Services />
        <ParallaxAds />
        <View
          style={{
            backgroundColor: "#fff",
            width: (90 / 100) * width,
            alignSelf: "center",
            padding: 20,
            borderRadius: 12,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "KalekoBold",
              }}
            >
              Medical History
            </Text>
            <Text
              style={{
                fontFamily: "KalekoBold",
                color: "#0374F8",
              }}
            >
              See all
            </Text>
          </View>

          {/* <View>
            <View
              style={{
                marginVertical: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  Appointment
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  12 Jan 2024
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  Check Up
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  - ₱200.45
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  Appointment
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  12 Jan 2024
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  Check Up
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  - ₱200.45
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  Appointment
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  12 Jan 2024
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  Check Up
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  - ₱200.45
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  Appointment
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  12 Jan 2024
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  Check Up
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  - ₱200.45
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  Appointment
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  12 Jan 2024
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  Check Up
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  - ₱200.45
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  Appointment
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  12 Jan 2024
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  Check Up
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  - ₱200.45
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  Appointment
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  12 Jan 2024
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  Check Up
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  - ₱200.45
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  Appointment
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  12 Jan 2024
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  Check Up
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  - ₱200.45
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  Appointment
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 10,
                    color: "#00000080",
                  }}
                >
                  12 Jan 2024
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  Check Up
                </Text>
                <Text
                  style={{
                    fontFamily: "KalekoBold",
                    fontSize: 12,
                  }}
                >
                  - ₱200.45
                </Text>
              </View>
            </View>
          </View> */}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
