<View style={styles.container}>
  <View style={styles.state}>
    <View style={styles.uppercat}>
      <View style={styles.cat1}>
        {/* <TouchableOpacity
        disabled={this.state.attackmode ? false : true}
        onPress={this._thiscatattacked(
          this.state.chatroomcats.cat1.catId
        )}
      >
        <Image
          source={Images[this.state.chatroomcats.cat1.catId]}
          style={{
            marginTop: 8,
            marginLeft: 10,
            width: 50,
            height: 50
          }}
        />
      </TouchableOpacity>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.subtitle}>
          ID : {this.state.chatroomcats.cat1.userId}
        </Text>
        <Text style={styles.subtitle}>
          HP : {this.state.chatroomcats.cat1.hp} / 7
        </Text>
      </View> */}
      </View>

      <View style={styles.cat2}>
        {this.state.chatroomcats.cat2 ? (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={this._thiscatattacked(
                this.state.chatroomcats.cat2.catId
              )}
            >
              <Image
                source={Images[this.state.chatroomcats.cat2.catId]}
                style={{
                  marginTop: 8,
                  marginLeft: 10,
                  width: 50,
                  height: 50
                }}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.subtitle}>
                ID : {this.state.chatroomcats.cat2.userId}
              </Text>
              <Text style={styles.subtitle}>
                HP : {this.state.chatroomcats.cat2.hp} / 7
              </Text>
            </View>
          </View>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.waiting}>고양이를 기다리는 중..</Text>
          </View>
        )}
      </View>
    </View>
    {/* <View style={styles.lowercat}>
    <View style={styles.cat3}>
      {this.state.chatroomcats.cat3 ? (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={this._thiscatattacked(
              this.state.chatroomcats.cat3.catId
            )}
          >
            <Image
              source={Images[this.state.chatroomcats.cat3.catId]}
              style={{
                marginTop: 8,
                marginLeft: 10,
                width: 50,
                height: 50
              }}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.subtitle}>
              ID : {this.state.chatroomcats.cat3.userId}
            </Text>
            <Text style={styles.subtitle}>
              HP : {this.state.chatroomcats.cat3.hp} / 7
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.waiting}>고양이를 기다리는 중..</Text>
        </View>
      )}
    </View>
    <View style={styles.cat4}>
      {this.state.chatroomcats.cat4 ? (
        <View>
          <TouchableOpacity
            onPress={this._thiscatattacked(
              this.state.chatroomcats.cat4.catId
            )}
          >
            <Image
              source={Images[this.state.chatroomcats.cat4.catId]}
              style={{
                marginTop: 8,
                marginLeft: 10,
                width: 50,
                height: 50
              }}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.subtitle}>
              ID : {this.state.chatroomcats.cat4.userId}
            </Text>
            <Text style={styles.subtitle}>
              HP : {this.state.chatroomcats.cat4.hp} / 7
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.waiting}>고양이를 기다리는 중..</Text>
        </View>
      )} */}
    {/* </View> */}
    {/* </View> */}
  </View>
</View>;
//   {/* <View style={styles.attackspace}>
//       <Text> attack <Text>
//   </View> */}

import React, { Component } from "react";
import moduleName from "module";
class test extends Component {
  render() {
    return <div />;
  }
}

export default test;
