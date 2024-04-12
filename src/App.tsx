import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as React from "react";
import { registerRootComponent } from "expo";

import * as eva from "@eva-design/eva";
import { TabsNavigator } from "@/components/TabsNavigator";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={{ ...eva.light }}>
        <TabsNavigator />
      </ApplicationProvider>
    </>
  );
}

registerRootComponent(App);
