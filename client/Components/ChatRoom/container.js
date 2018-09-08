import React, { Component } from "react";
import Store from "../store";
import ChatRoom from "./ChatRoom";

class ChatRoomContainer extends Component {
  render() {
    return (
      <Store.Consumer>
        {store => <ChatRoom {...this.props} store={store} />}
      </Store.Consumer>
    );
  }
}

export default ChatRoomContainer;
