import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirm: "",
            isWrongPhone: false,
            isWrongPass: false
        }
    }
    onChangePhone = textPhone => {
        this.setState({
            username: textPhone
        })
    }
    onchangePass = textPass => {
        this.setState({
            password: textPass
        })
    }
    onchangeConfirm = textConfirm => {
        this.setState({
            confirm: textConfirm
        })
    }
    onPressNext = () => {
        const { username, password, confirm } = this.state;
        if (username == "" || password == "" || confirm == "") {
            alert("Không được để trống")
            return false
        }
        if (password.length < 6) {
            alert("Mật khẩu cần nhiều hơn 6 kí tự")
            return false;
        }
        if (password != confirm) {
            alert("Nhập lại mật khẩu chưa trùng khớp")
            return false
        }
        else {
            this.props.navigation.navigate("Term", { username: username, password: password })
        }
    }
    onPressCancel = () => {
        this.props.navigation.goBack();
    }
    checkPhone = () => {
        const { username } = this.state
        if ((username.length < 10 || username.length > 11) && username.length != 0) {
            this.setState({
                isWrongPhone: true
            })
        }
        else {
            this.setState({
                isWrongPhone: false
            })
        }
    }
    checkPass = () => {
        const { password } = this.state
        if (password.length < 6 && password.length != 0) {
            this.setState({
                isWrongPass: true
            })
        }
        else {
            this.setState({
                isWrongPass: false
            })
        }
    }
    render() {
        const { confirm, password, isWrongPhone, isWrongPass } = this.state;
        return (
            <KeyboardAvoidingView enabled behavior="padding" keyboardVerticalOffset="-100" style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.txtTitle}>Sign Up</Text>
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Your phone number"
                        onChangeText={this.onChangePhone}
                        onSubmitEditing={() => this.passwordRef.focus()}
                        blurOnSubmit={false}
                        onEndEditing={this.checkPhone}
                        keyboardType={'number-pad'}
                    />
                    {isWrongPhone && <Text>Số điện thoại không tồn tại</Text>}
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        onChangeText={this.onchangePass}
                        ref={ref => this.passwordRef = ref}
                        onSubmitEditing={() => this.confirmpasswordRef.focus()}
                        blurOnSubmit={false}
                        onEndEditing={this.checkPass}
                        secureTextEntry={true}
                    />
                    {isWrongPass && <Text>Mật khẩu phải nhiều hơn 6 kí tự</Text>}
                    <TextInput
                        style={styles.textInput}
                        placeholder="Confirm Password"
                        onChangeText={this.onchangeConfirm}
                        ref={ref => this.confirmpasswordRef = ref}
                        secureTextEntry={true}
                    />
                    {confirm === password && confirm != '' && password != '' && <Text>Trùng khớp</Text>}
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.btnNext} onPress={this.onPressNext}>
                        <Text style={styles.txtNext}>Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnCancel} onPress={this.onPressCancel}>
                        <Text style={styles.txtCancel}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B48DFA'
    },
    title: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: "center"
    },
    txtTitle: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    inputGroup: {
        flex: 0.4,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 5,
    },
    textInput: {
        width: 300,
        height: 50,
        borderRadius: 50,
        marginVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#F6F8FA"
    },
    buttonGroup: {
        flex: 0.3,
        alignItems: 'center',
        flexDirection: 'column',
    },
    btnNext: {
        backgroundColor: 'pink',
        borderRadius: 50,
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    txtNext: {
        color: 'black',
        fontSize: 25,
        fontWeight: '400'
    },
    btnCancel: {
        borderWidth: 1,
        borderRadius: 50,
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtCancel: {
        color: 'black',
        fontSize: 25,
        fontWeight: '400'
    },
})
