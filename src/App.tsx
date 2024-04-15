import * as React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { registerRootComponent } from "expo";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Appearance } from "react-native";
import { useEffect } from "react";
import { default as theme } from "./custom-theme.json";
import { default as mapping } from "../mapping.json";
import MainNavigation from "./navigation/MainNavigation";
import "./global.css";

export default function App() {
  const [colorScheme, setColorScheme] = React.useState(
    Appearance.getColorScheme()
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(() => {
      setColorScheme(Appearance.getColorScheme());
      Appearance.setColorScheme(Appearance.getColorScheme());
    });

    return () => subscription.remove();
  }, [Appearance.getColorScheme()]);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        customMapping={mapping}
        theme={{ ...eva.light, ...theme }}
      >
        <MainNavigation />
      </ApplicationProvider>
    </>
  );
}

registerRootComponent(App);
