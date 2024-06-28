import { ActivityIndicator, StyleSheet, Text, View, Modal } from 'react-native';
import React from 'react';

const Loading = ({ visible }: { visible: boolean }) => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#135D66" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 16,
  },
});

export default Loading;
