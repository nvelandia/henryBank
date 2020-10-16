import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import s from '../../style/styleSheet';
import colors from '../../style/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function List({ contacts, isFetching }) {
  if (isFetching) return <ActivityIndicator style={{}} />;
  if (contacts) {
    console.log('CONTACTOS:',contacts);
    return (
      <>
        {contacts.map((contact, index) => (
          <ScrollView key={index}>
              <View style={{ ...s.mb(4), flexDirection: "row" }}>
                <Image
                  source={{ uri: contact.User.avatar }}
                  style={{
                    width: 50,
                    height: 50,
                    alignSelf: "flex-start",
                    borderRadius: 10,
                  }}
                ></Image>
                <View>
                  <Text
                    style={{
                      ...s.textColor(colors.white),
                      ...s.size(3.5),
                      ...s.ml(4),
                      ...s.mb(1),
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {" "}
                    {contact.nickname.toLowerCase()}{" "}
                  </Text>
                  <Text
                    style={{
                      ...s.textColor(colors.white),
                      ...s.size(2.5),
                      ...s.ml(4),
                    }}
                  >
                    <IonIcon name="ios-mail" /> {contact.User.email}{" "}
                  </Text>
                </View>
                <IonIcon
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    right: 0,
                  }}
                  name="ios-arrow-forward"
                  size={30}
                  color={colors.white}
                />
              </View>
            <View
              style={{
                borderBottomColor: colors.pink,
                borderBottomWidth: 1,
                ...s.mb(5),
              }}
            />
          </ScrollView>
        ))}
      </>
    );
  }
}
