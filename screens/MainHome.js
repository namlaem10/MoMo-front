import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Keyboard } from 'react-native';

import SearchBox from '../components/SearchBox';
import ItemRecommend from '../components/ItemRecommend';

const Data = [
  { id: 1, name: 'Phúc Long', image: require('../assets/Momo_1.jpg'), address: 'quận 1', longdis: '7km', price: '100.000 - 200.000' },
  { id: 2, name: 'The Coffee House', image: require('../assets/Momo_2.jpg'), address: 'quận 2', longdis: '6km', price: '150.000 - 200.000' },
  { id: 3, name: 'Hoàng Yến Buffet', image: require('../assets/Momo_3.jpg'), address: 'quận 3', longdis: '5km', price: '300.000 - 400.000' },
  { id: 4, name: 'Phúc Long', image: require('../assets/Momo_1.jpg'), address: 'quận 4', longdis: '4km', price: '250.000 - 300.000' },
  { id: 5, name: 'The Coffee House', image: require('../assets/Momo_2.jpg'), address: 'quận 5', longdis: '3km', price: '50.000- 100.000' },
  { id: 6, name: 'Hoàng Yến Buffet', image: require('../assets/Momo_3.jpg'), address: 'quận 6', longdis: '2km', price: '500.000 - 1.000.000' },
];
export default class MainHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: '',
      List: Data,
      whatScreen: 1,
      isOldUser: true,  // đọc trans, nếu có trans thì = true (user cũ), ko có thì = fasle (user mới)
    };
  }
  navigateModal = () => {
    this.props.navigation.navigate("Modal");
  }
  onPressDungNhieu = () => {
    this.setState({
      whatScreen: 1,
    })
  }
  onPressGanToi = () => {
    this.setState({
      whatScreen: 2,
    })
  }
  onPressLishSu = () => {
    this.setState({
      whatScreen: 3,
    })
  }
  onPressItemRecommend = item => {
    const { navigation } = this.props;
    navigation.navigate('ItemDetail', { data: item });
  }
  onEndEditingSearch = async textSearch => { // Xử lí tìm kiếm
    if (textSearch != '') {
      await this.setState({
        List: Data,
      })
      const { List } = this.state;
      const newData = List.filter(function (item) {
        //applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = textSearch.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        List: newData,
      })
    }
    else {
      this.setState({
        List: Data,
      })
    }
  }
  onPressItemAuto = (item) => {
    Keyboard.dismiss();
    this.setState({
      textSearch: item.name
    })
    this.onEndEditingSearch(item.name);
  }
  render() {

    const { navigation } = this.props;
    const Category = navigation.getParam('data');

    const {
      whatScreen,
      isOldUser,
      List,
      textSearch
    } = this.state;

    let list = [...List]
    switch (whatScreen) {
      case 1:
        break;
      case 2: list = list.splice(0).reverse();
        break;
      default: list = list.filter(item => item.id > 2);
        break;
    }

    console.log(List)

    return (
      <View style={styles.container}>
        <View style={styles.Header}>
          <SearchBox
            text={textSearch}
            onChangeText={(text) => this.setState({ textSearch: text })}
            onEndEditing={() => this.onEndEditingSearch(textSearch)}
            onPressItemAuto={this.onPressItemAuto}
          />
          <View>
            <TouchableOpacity style={styles.buttonLoc} onPress={this.navigateModal}>
              <Text>Lọc</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Content}>
          <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}><Text>Trở về</Text></TouchableOpacity>
          <Text style={styles.TextDanhMuc}>{Category.name}</Text>
          {
            isOldUser ? // nếu là user cũ => 3 nút, User mới => 2 nút
              <View style={styles.TabButton}>
                <TouchableOpacity
                  style={whatScreen == 1 ? styles.ChoseButton : styles.unChoseButton}
                  onPress={this.onPressDungNhieu}
                >
                  <Text style={whatScreen == 1 ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Dùng nhiều</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={whatScreen == 2 ? styles.ChoseButton : styles.unChoseButton}
                  onPress={this.onPressGanToi}
                >
                  <Text style={whatScreen == 2 ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Gần tôi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={whatScreen == 3 ? styles.ChoseButton : styles.unChoseButton}
                  onPress={this.onPressLishSu}
                >
                  <Text style={whatScreen == 3 ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Lịch sử</Text>
                </TouchableOpacity>
              </View>
              :
              <View style={styles.TabButton}>
                <TouchableOpacity
                  style={whatScreen == 1 ? styles.ChoseButton : styles.unChoseButton}
                  onPress={this.onPressDungNhieu}
                >
                  <Text style={whatScreen == 1 ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Dùng nhiều</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={whatScreen == 2 ? styles.ChoseButton : styles.unChoseButton}
                  onPress={this.onPressGanToi}
                >
                  <Text style={whatScreen == 2 ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Gần tôi</Text>
                </TouchableOpacity>
              </View>
          }
          <ScrollView contentContainerStyle={styles.ListDanhMuc}>
            {
              list.map(item => {
                return (
                  <ItemRecommend
                    onPress={() => this.onPressItemRecommend(item)}
                    key={item.id}
                    itemData={item}
                  />
                );
              })
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  Header: {
    flex: 0.2,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLoc: {
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: 'gray',
    backgroundColor: 'gray',
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    width: 40,
  },
  Content: {
    flex: 0.8,
    flexDirection: 'column',
  },
  TextDanhMuc: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '400',
  },
  TabButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ChoseButton: {
    height: 30,
    width: 120,
    borderBottomColor: 'red',
    borderBottomWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unChoseButton: {
    height: 30,
    width: 120,
    borderBottomColor: 'gray',
    borderBottomWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ChoseTabButtonText: {
    fontWeight: 'bold',
  },
  UnChoseTabButtonText: {
    color: 'gray'
  },
  ListDanhMuc: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});