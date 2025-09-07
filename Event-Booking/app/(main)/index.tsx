import React from "react";

import {
  GetAllEvents,
  GetClosingSoonEvents,
  GetCompletedEvents,
} from "@/services/events";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AllEventsScreen from "./events/allEvents";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#f76c11",
        tabBarInactiveTintColor: "#9d9a9a",
        tabBarIndicatorStyle: {
          backgroundColor: "#f76c11",
        },
      }}
    >
      <Tab.Screen name="All Events">
        {(props: any) => (
          <AllEventsScreen {...props} eventQueryData={GetAllEvents} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Closing Soon">
        {(props: any) => (
          <AllEventsScreen {...props} eventQueryData={GetClosingSoonEvents} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Completed">
        {(props: any) => (
          <AllEventsScreen {...props} eventQueryData={GetCompletedEvents} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
const MainEvents = () => {
  return <MyTabs />;
};

export default MainEvents;
