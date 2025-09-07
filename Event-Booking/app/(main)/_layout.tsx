import { LayoutHeader } from "@/components/ui/LayoutHeader";
import { GetUserEvents, GetUserFavourites } from "@/services/user";
import { logoutThunk } from "@/store/authSlice";
import { useAppDispatch } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable, Text, View } from "react-native";
import About from "./drawer/about";
import Help from "./drawer/help";
import Setting from "./drawer/setting";
import AllEventsScreen from "./events/allEvents";
import SingleEventScreen from "./events/EventDetails";
import HomeScreen from "./index";
import ProfileScreen from "./profile";
import SearchScreen from "./search";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Tabs() {
  return (
    <>
      <LayoutHeader icon="menu" />
      <Tab.Navigator
        screenOptions={{
          sceneStyle: {
            backgroundColor: "#ffffff",
          },
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
            paddingVertical: 8,
          },
          tabBarActiveTintColor: "#f76c11",
          tabBarInactiveTintColor: "#757575",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Events"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        >
          {(props: any) => (
            <AllEventsScreen
              {...props}
              eventQueryData={GetUserEvents}
              source="user"
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

function TabsWithStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabsMain" component={Tabs} />
      <Stack.Screen
        name="EventDetails"
        component={SingleEventScreen}
        options={{
          headerShown: true,
          header: () => <LayoutHeader title="Event Details" />,
        }}
      />
    </Stack.Navigator>
  );
}

function FavouriteStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="FavouriteList"
        options={{
          headerShown: true,
          header: () => <LayoutHeader title="Favourite Events" />,
        }}
      >
        {(props: any) => (
          <AllEventsScreen
            {...props}
            eventQueryData={GetUserFavourites}
            source="favourite"
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="EventDetails"
        component={SingleEventScreen}
        options={{
          headerShown: true,
          header: () => <LayoutHeader title="Event Details" />,
        }}
      />
    </Stack.Navigator>
  );
}
function CustomDrawerContent(props: any) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View className="p-4">
        <View className="flex-row items-center space-x-3">
          <Ionicons name="person-circle-outline" size={75} color="#f76c11" />
        </View>
      </View>
      <DrawerItemList {...props} />
      <View>
        <Pressable
          onPress={async () => {
            await dispatch(logoutThunk());
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "index" }],
              })
            );
          }}
          className="flex-row items-center p-4 rounded-full"
        >
          <Ionicons
            name="log-out-outline"
            className="ml-[4px]"
            size={24}
            color="#f76c11"
          />
          <Text className="ml-3 text-base text-primary font-Nunitosemi font-bold">
            Logout
          </Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
}

export default function MainLayout() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: "70%" },
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#f76c11",
        drawerActiveBackgroundColor: "#f76c11",
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
        },
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name=".."
        options={{
          drawerLabel: "Home",
          drawerItemStyle: { display: "none" },
        }}
        component={TabsWithStack}
      />
      <Drawer.Screen
        name="Favourites"
        component={FavouriteStack}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={Setting}
        options={{
          headerShown: true,
          header: () => <LayoutHeader title="Settings" />,
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          headerShown: true,
          header: () => <LayoutHeader title="About Evento" />,
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: true,
          header: () => <LayoutHeader title="Help" />,
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "help-circle" : "help-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
