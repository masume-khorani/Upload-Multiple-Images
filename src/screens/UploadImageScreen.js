import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, ToastAndroid, ImageBackground, Image, StyleSheet } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ZoomImage from '../components/ZoomImage';
import ImagePicker from "react-native-image-picker";
class UploadImageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageModalVisible: false,
            imageSource: require('../img/image.png'),
            imageModal: require('../img/image.png'),
            images: [],
        }
        this.renderImages = this.renderImages.bind(this);
        this.renderImageModal = this.renderImageModal.bind(this);
        this.deleteSelectedImage = this.deleteSelectedImage.bind(this);
        this.toggleImageModal = this.toggleImageModal.bind(this);
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            title: 'Choose picture',
            cancelButtonTitle: 'Cancel',
            chooseFromLibraryButtonTitle: 'Gallery',
            takePhotoButtonTitle: 'Camera'
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };
                this.state.images.push(source);
                this.setState({
                    imageSource: source,
                })
            }
        });
    };
    deleteSelectedImage(index) {
        let deleteImages = [...this.state.images];
        deleteImages.splice(index, 1)
        this.setState({
            images: deleteImages
        })
    }
    toggleImageModal = (image) => {
        this.setState({
            imageModalVisible: !this.state.imageModalVisible,
            imageModal: image
        })
    };
    renderImages() {
        return (
            <ScrollView style={styles.formImagesContainer}>
                <FlatList
                    data={this.state.images}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index, separators }) => (
                        <TouchableOpacity
                            key={item}
                            style={styles.formFlatListItemContainer}
                            onPress={() => this.toggleImageModal(item)}>
                            <ImageBackground source={item}
                                imageStyle={{ borderRadius: 12 }}
                                style={styles.formFlatListImage} >
                                <TouchableOpacity
                                    onPress={() => this.deleteSelectedImage(index)}
                                    style={styles.formFlatListDeleteImgTouch}>
                                    <Text style={styles.formFlatListDeleteImgTxt}> delete</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </TouchableOpacity>
                    )}
                    ListHeaderComponent={<TouchableOpacity
                        style={styles.FormFlatListHeaderContain}
                        onPress={() =>
                            (this.state.images.length === 3 ?
                                ToastAndroid.show('You are allowed to upload only 3 images', ToastAndroid.LONG)
                                : this.selectPhotoTapped())}>
                        <Entypo
                            name="camera"
                            color={'#bdbdbd'}
                            size={wp('10%')}
                            style={styles.formFlatListImgIcon} />
                        <View style={styles.formFlatListAddImgContain}>
                            <Text style={styles.formFlatListAddImgText}>add new</Text>
                            <Entypo
                                name="plus"
                                color={'#bdbdbd'}
                                size={wp('3%')}
                                style={styles.formFlatListAddImgIcon} />
                        </View>
                    </TouchableOpacity>}
                />
            </ScrollView>

        )
    }
    renderImageModal() {
        return <ZoomImage imageModalVisible={this.state.imageModalVisible} toggleImageModal={this.toggleImageModal} imageModal={this.state.imageModal} />
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.lable}>Upload your images</Text>
                {this.renderImages()}
                {this.renderImageModal()}
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: wp('40%')
    },
    lable: {
        marginBottom: wp('10%'),
        fontSize: wp('5%'),
    },
    formImagesContainer: {
        marginLeft: wp('5%'),
        marginRight: wp('5%'),
        marginBottom: wp('10%'),
        alignSelf: 'flex-end'
    },
    formFlatListItemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 5,
        borderRadius: 12
    },
    formFlatListImage: {
        width: wp('20%'),
        height: wp('25%'),
        borderRadius: 12,
        justifyContent: 'flex-end',
    },
    formFlatListDeleteImgTouch: {
        backgroundColor: 'rgba(255,255,255, 0.8)',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formFlatListDeleteImgTxt: {
        fontFamily: 'Vazir',
        fontSize: wp('4%')
    },
    formFlatListImgIcon: {
        alignSelf: 'center'
    },
    formFlatListAddImgContain: {
        flexDirection: 'row-reverse'
    },
    formFlatListAddImgText: {
        fontFamily: 'Vazir',
        color: '#bdbdbd',
        fontSize: wp('3%')
    },
    formFlatListAddImgIcon: {
        alignSelf: 'center'
    },
    FormFlatListHeaderContain: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        padding: 10,
        borderRadius: 12,
        marginTop: 5,
        width: wp('20%'),
        height: wp('25%'),
    },
})

export default UploadImageScreen;