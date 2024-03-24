import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, Linking, Dimensions, Share, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import { useUser } from '@clerk/clerk-expo';
import { doc, deleteDoc, query, collection, where, getFirestore, getDocs } from 'firebase/firestore';
import { connect } from 'formik';
import { app } from '../../firebaseConfig';

export default function Postdetails({navigation}) {
    const { params } = useRoute();
    const [post, setPost] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const scrollViewRef = useRef(null);
    const { user } = useUser();
    const db=getFirestore(app);
    const nav=useNavigation();

    useEffect(() => {
        params && setPost(params.post);
    }, [params]);

    useEffect(() => {
        if (post) {
            ShareButton();
        }
    }, [post]);

    const ShareButton = () => {
        navigation.setOptions({
            headerRight: () => (
                <Ionicons
                    name="share-social-sharp"
                    style={{ marginRight: 17, fontSize: 20, color: 'white' }}
                    onPress={SharePost}
                />
            ),
        });
    };

    const SharePost = () => {
        if (!post) {
            console.error('Error: Post is null.');
            return;
        }
    
        const { title, price, desc, whatsppNumber, images } = post;
    
        const content = {
            message: `*IDLIP ONLINE STORE*\n\n*Post Name:* ${title}\n*Price:* ${price}\n*Description:* ${desc}\n*WhatsApp Number:* ${whatsppNumber}\n\n *Image:* ${images || 'No image available'}`,
        };
    
        Share.share(content).then(resp => {
            // Handle share response if needed
        });
    };

    const formatCreatedAt = () => {
        if (post && post.createdAt) {
            const createdAtDate = post.createdAt.toDate();
            return createdAtDate.toLocaleString();
        }
        return '';
    };

    const handleSendMessage = () => {
        if (!post || !post.whatsppNumber || !isValidWhatsAppNumber(post.whatsppNumber)) {
            Alert.alert('Error', 'The WhatsApp number is missing or invalid. Please provide a valid WhatsApp number.');
            return;
        }
    
        const message = `Hey, I'm interested in your post: "${post.title}"\n on IDLIP ONLINE STORE.`;
        const whatsappURL = `whatsapp://send?phone=${post.whatsppNumber}&text=${encodeURIComponent(message)}`;
    
        Linking.openURL(whatsappURL)
            .catch((err) => {
                console.error('An error occurred while opening WhatsApp:', err);
                Alert.alert('Error', 'Failed to open WhatsApp');
            });
    };
    
    const isValidWhatsAppNumber = (number) => {
        return !!number && typeof number === 'string';
    };

    const handledeletepost=()=>{
        Alert.alert( 'do you want to delete this post ?',"Are you sure you want to delete this post?", [
            {
                text:'Yes',
                onPress:()=>deleteFromFirestore()
            },
         
            {
                text:'No',
                
            },
        ])
    }

    const deleteFromFirestore = async () => {
        try {
            const q = query(collection(db, 'UserPost'), where('title', '==', post.title));
            const snapshot = await getDocs(q);
            snapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
            console.log('The post has been deleted successfully');
            nav.goBack();
        } catch (error) {
            console.error('Error deleting post:', error);
            // Handle error gracefully, show an alert, or log it
        }
    };
    

    const windowWidth = Dimensions.get('window').width;

    const goToNextImage = () => {
        if (currentImageIndex < post.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
            scrollViewRef.current.scrollTo({
                x: (currentImageIndex + 1) * windowWidth,
                animated: true,
            });
        }
    };

    const goToPreviousImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
            scrollViewRef.current.scrollTo({
                x: (currentImageIndex - 1) * windowWidth,
                animated: true,
            });
        }
    };

    return (
        <ScrollView style={{ flex: 1 , backgroundColor:'white'}}>
            {post && (
                <View className="flex flex-row">
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 8}}
                        pagingEnabled
                        onScroll={(event) => {
                            const xOffset = event.nativeEvent.contentOffset.x;
                            const index = Math.round(xOffset / windowWidth);
                            setCurrentImageIndex(index);
                        }}
                        scrollEventThrottle={200}
                    >
                        {post?.images && post.images.map((image, index) => (
                            <View key={index} style={{ marginRight: 10 }}>
                                <Image
                                    source={{ uri: image }}
                                    style={{ width: windowWidth -13, height: 400, marginTop:5, resizeMode: 'cover', borderRadius: 10 }}
                                />
                            </View>
                        ))}
                    </ScrollView>
                    {post?.images.length > 1 && (
                        <TouchableOpacity
                            style={{ position: 'absolute', top: '50%', right: 20, zIndex: 10 }}
                            onPress={goToNextImage}
                        >
                            <AntDesign name="rightcircle" size={26} color="#D7DDE5" />
                        </TouchableOpacity>
                    )}

                    {post?.images.length > 1 && (
                        <TouchableOpacity
                            style={{ position: 'absolute', top: '50%', left: 20, zIndex: 10 }}
                            onPress={goToPreviousImage}
                        >
                            <AntDesign name="leftcircle" size={26} color="#D7DDE5" />
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {post && (
                <View>
                    <Text style={{ backgroundColor: '#3B82F6', padding: 8, textAlign: 'center', fontSize: 18, color: 'white', borderRadius: 20,marginLeft:50 ,marginRight: 50, marginTop: 5 }}>{post?.kind}</Text>
                </View>
            )}

            {post && (
                <View style={{ padding: 10, flexDirection: 'row'}}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Time:</Text>
                    <Text style={{ marginLeft: 5, marginTop: 1, fontSize: 17 }}>{formatCreatedAt()}</Text>
                </View>
            )}

            {post && (
                <View style={{ padding: 10, flexDirection: 'row'}}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Title:</Text>
                    <Text style={{ fontSize: 17, marginLeft: 9,  marginTop: 1, marginRight: 40,  }}>{post?.title}</Text>
                </View>
            )}

            {post && (
                <View style={{ padding: 10, flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Price:</Text>
                    <Text style={{ fontSize: 18, marginLeft: 5, fontWeight: 'bold', color: '#3B82F6' }}>{post?.price}</Text>
                </View>
            )}

            {post && (
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Description:</Text>
                    <Text style={{ fontSize: 17, marginLeft: 15, marginBottom: 30 }}>{post?.desc}</Text>
                </View>
            )}

            {user?.primaryEmailAddress.emailAddress === post?.userEmail ? (
                <TouchableOpacity
                    style={{ backgroundColor: '#F91504', marginHorizontal: 15, borderRadius: 999, padding: 13,marginLeft:80 ,marginRight:80, marginBottom: 40 }}
                    onPress={handledeletepost}
                >
                    <Text style={{ color: '#fff',  fontSize: 17, textAlign: 'center' }}>Delete Post</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={{ backgroundColor: '#417C42', marginHorizontal: 15, borderRadius: 999, padding: 13,marginLeft:80 ,marginRight:80, marginBottom: 40 }}
                    onPress={handleSendMessage}
                >
                    <Text style={{ color: '#fff',  fontSize: 17, textAlign: 'center' }}>Send Message</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}
