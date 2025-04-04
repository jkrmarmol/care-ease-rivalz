// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push("glb", "gltf", "png", "jpg", "ttf");
config.resolver.unstable_conditionNames = ["browser", "require", "react-native"];

module.exports = config;
