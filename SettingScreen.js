import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function SettingScreen() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(false);

  const handleNotificationsSwitch = () => {
    setIsNotificationsEnabled((prev) => !prev);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <Text style={styles.sectionSubtitle}>Change app preferences</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Option 1</Text>
          <Switch value={false} />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Option 2</Text>
          <Switch value={true} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Settings</Text>
        <Text style={styles.sectionSubtitle}>Configure notification preferences</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Enable notifications</Text>
          <Switch value={isNotificationsEnabled} onValueChange={handleNotificationsSwitch} />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Option 2</Text>
          <Switch value={false} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Settings</Text>
        <Text style={styles.sectionSubtitle}>Edit your profile information</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Edit Profile</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Change Password</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Settings</Text>
        <Text style={styles.sectionSubtitle}>Manage general app settings</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Option 1</Text>
          <Switch value={true} />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Option 2</Text>
          <Switch value={false} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F6F6F6',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical:5
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
