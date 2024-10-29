import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=6');
      const cafeImages = [
        'https://asset.kompas.com/crops/wSx1s3Reri_lmiPCptiKAq-QgnU=/152x93:952x626/1200x800/data/photo/2020/09/27/5f70436d57446.jpg',
        'https://cdn0-production-images-kly.akamaized.net/0hj-gpXrySIRMHhZL_BdUs1pzEo=/264x0:931x667/1200x1200/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3549511/original/031548600_1629788506-shutterstock_1992161843.jpg',
        'https://awsimages.detik.net.id/community/media/visual/2024/03/20/aneka-minuman-segar-untuk-buka-puasa-3_11.jpeg?w=350',
        'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/1b6748af-54e1-456b-874e-731652bc3333_Go-Biz_20220707_223520.jpeg',
        'https://warungpondokmadu.com/wp-content/uploads/2020/12/Ice-cappucino-or-cafe-late.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWNzwXEuufcbULvDB6MNBMshu-vxqAzKSQFw&s',
      ];
      const drinkNames = ['Mochacino', 'Matcha', 'Dawet', 'Strawberry', 'Cappucino', 'Mocktail'];

      const drinkDescriptions = [
        'With boba',
        'With strawberry',
        'With brown sugar',
        'With ice cream',
        'With ice',
        'Blue Lagoon',
      ];

      const formattedUsers = response.data.results.map((user: any, index: number) => ({
        id: user.login.uuid,
        name: drinkNames[index % drinkNames.length], // Menggunakan nama minuman
        email: drinkDescriptions[index % drinkDescriptions.length],
        picture: cafeImages[index % cafeImages.length],
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = () => {
    const newUserObj = {
      id: Math.random().toString(),
      ...newUser,
      picture: 'https://example.com/default-cafe.jpg', // URL gambar kafe default
    };
    setUsers([newUserObj, ...users]);
    setNewUser({ name: '', email: '' });
  };

  const updateUser = (id: string) => {
    const updatedUsers = users.map((user) => 
      user.id === id ? { ...user, ...newUser } : user
    );
    setUsers(updatedUsers);
    Alert.alert("Update", "User data updated successfully");
    setNewUser({ name: '', email: '' });
  };

  const deleteUser = (id: string) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
    Alert.alert("Delete", "User deleted successfully");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>API List Minuman</Text>

        {/* Tombol Tambah User */}
        <TouchableOpacity style={styles.addButton} onPress={createUser}>
          <Text style={styles.addButtonText}>Tambah Minuman</Text>
        </TouchableOpacity>

        {/* Daftar Minuman */}
        {users.map((user) => (
          <View key={user.id} style={styles.card}>
            <Image source={{ uri: user.picture }} style={styles.image} />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>

            {/* Tombol Update dan Delete */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => updateUser(user.id)} style={styles.updateButton}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteUser(user.id)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#c5c3c6c4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: 'center',
    width: '80%',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
    marginBottom: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 38,
  },
  updateButton: {
    backgroundColor: '#FFA500',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    width: 60,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
    width: 60,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
});
