import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { app } from '../../firebaseConfig';
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';
import { serverTimestamp } from 'firebase/firestore';

export default function Addpost() {
  const [images, setImages] = useState([]);
  const storage = getStorage();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'lists'));
      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push(doc.data());
      });
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  const onSubmitMethod = async (values, { resetForm }) => {
    if (images.length === 0 || !values.kind || !values.title || !values.price || !values.desc || !values.address || !values.whatsppNumber) {
      alert("Please fill out all fields");
    } else {
      try {
        setLoading(true);
        values.userName = user.fullName;
        values.userEmail = user.primaryEmailAddress.emailAddress;
        values.userImage = user.imageUrl;

        const uploadTasks = images.map(async (image) => {
          const response = await fetch(image);
          const blob = await response.blob();
          const filename = `IdlipOnlineStorePostImages/${user.emailAddresses}/${Date.now()}.png`;
          const storageRef = ref(storage, filename);
          await uploadBytes(storageRef, blob);
          const downloadURL = await getDownloadURL(storageRef);
          return downloadURL;
        });

        const downloadURLs = await Promise.all(uploadTasks);
        values.images = downloadURLs;
        values.createdAt = serverTimestamp();
        await addDoc(collection(db, "UserPost"), values);
        setLoading(false);
        Alert.alert(" The post have shared successfully!");
        resetForm();
        setImages([]); 
      } catch (error) {
        console.error("Error submitting form data:", error);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      multiple: true, 
    });
    if (!result.cancelled && result.assets) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...selectedImages]);
    }
  };
  
  

  // Function to delete an image by its index
  const deleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <KeyboardAvoidingView style={{ padding:10, flex: 1 , backgroundColor:'white'}} behavior="padding">
      <View style={{ padding: 7, paddingTop: 25 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 27, marginLeft: 3 }}>Adding new post</Text>
      </View>
      <ScrollView style={styles.container}>
        <Formik
          initialValues={{ title: '', kind: '', price: '', whatsppNumber: '', address: '', desc: '', images: [], userName: '', userEmail: '', userImage: '', createdAt: Date.now() }}
          onSubmit={(values, { resetForm }) => onSubmitMethod(values, { resetForm })}
          innerRef={formRef} 
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
            <View className="p-2">
              <View style={styles.imagePickerContainer}>
                {images.map((uri, index) => (
                  <View key={index} style={{ position: 'relative' }}>
                    <Image style={styles.image} source={{ uri }} />
                    <TouchableOpacity
                      onPress={() => deleteImage(index)}
                      style={styles.deleteButton}>
                     <Text className="text-[15px] text-white" >X</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity onPress={pickImage} style={styles.addImageButton}>
                  <Text style={styles.addImageText}>Add image</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={values?.kind}
                  onValueChange={itemValue => setFieldValue('kind', itemValue)}
                >
                  {categoryList && categoryList.map((item, index) => (
                    <Picker.Item key={index} label={item.name} value={item.name} />
                  ))}
                </Picker>
              </View>

              <TextInput
                style={[styles.input, { fontSize: 14 }]}
                placeholder='Name'
                value={values?.title}
                onChangeText={handleChange('title')}
                maxLength={100}
                multiline={true}
              />

              <TextInput
                style={[styles.input, { fontSize: 14 }]}
                placeholder='Price'
                value={values?.price}
                onChangeText={handleChange('price')}
                maxLength={25}
              />

              <TextInput
                style={[styles.input, { fontSize: 14 }]}
                placeholder='WhatsApp Number (+90xxxxxxxxxxxx)'
                maxLength={15}
                onChangeText={handleChange('whatsppNumber')}
                keyboardType='phone-pad'
                value={values.whatsppNumber} // Add this line
              />

              <TextInput
                style={[styles.input, { fontSize: 14 }]}
                placeholder='Address'
                value={values?.address}
                onChangeText={handleChange('address')}
                maxLength={100}
                multiline={true}
              />

              <TextInput
                style={[styles.inputdesc, { textAlignVertical: 'top' }, {fontSize:15}]}
                placeholder='Description'
                value={values?.desc}
                multiline={true}
                numberOfLines={5}
                onChangeText={handleChange('desc')}
                maxLength={500}
              />

              <TouchableOpacity onPress={handleSubmit}
                style={{marginLeft:25, marginRight:25, backgroundColor: loading ? '#ccc' : '#287BD4' }}
                disabled={loading}
                className="mt-6 mb-10 p-4 rounded-full"
              >
                {loading ?
                  <ActivityIndicator color='#fff' />
                  :
                  <Text style={styles.submitText}>Share</Text>
                }
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor:'white',
    flex: 1,
  },
  imagePickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  image: {
    borderRadius: 20,
    height: 150,
    width: 153,
    marginRight: 10,
    marginBottom: 10,
    borderColor: 'blue',
    borderWidth: 1,
  },
  
  addImageButton: {
    borderRadius: 20,
    height: 150,
    width: 153,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  addImageText: {
    fontSize: 15,
    color: '#666',
  },
  pickerContainer: {
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 17,
  },
  input: {
    padding: 10,
    borderWidth: 1.5,
    fontSize: 17,
    borderRadius: 17,
    paddingHorizontal: 17,
    marginTop: 8,
    marginBottom: 8,
    paddingTop: 10,
  },
  inputdesc: {
    padding: 10,
    borderWidth: 1.5,
    fontSize: 17,
    borderRadius: 17,
    paddingHorizontal: 17,
    marginTop: 8,
    marginBottom: 8,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  submitButton: {
    padding: 12,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    marginTop: 20,
    
  },
  submitText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  deleteButton: {
    position: 'absolute',
    top: -5,
    left: -5,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 7,
    borderColor: 'blue',
    borderWidth: 1,
  },

});
