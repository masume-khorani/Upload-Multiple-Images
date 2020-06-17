
import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import Modal from "react-native-modal";
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class ZoomImage extends Component {
    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}
                isVisible={this.props.imageModalVisible}>
                <Modal
                    isVisible={this.props.imageModalVisible}
                    backdropOpacity={1}
                    backdropColor={'#ffffff'}
                    onBackButtonPress={() => this.props.toggleImageModal(this.props.imageModal)}
                    hideModalContentWhileAnimating={true}
                    animationIn={'bounceIn'}
                    animationInTiming={1500}
                    animationOut={'bounceOut'} >
                    <Image source={this.props.imageModal}
                        style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, alignSelf: 'center' }}
                        resizeMode='contain' />
                </Modal>
            </View>
        )
    }
}
export default ZoomImage;