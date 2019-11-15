import React from 'react';

export const NotificationType = Object.freeze({
  SUCCESS: Symbol("success"),
  INFO: Symbol("info"),
  ERROR: Symbol("error")
});

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  let notificationStyle = {
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15
  };

  if (notification.type === NotificationType.SUCCESS) {
    notificationStyle.color = 'green';
    notificationStyle.background = 'lightgreen';
  } else if (notification.type === NotificationType.ERROR) {
    notificationStyle.color = 'crimson';
    notificationStyle.background = 'pink';
  } else if (notification.type === NotificationType.INFO) {
    notificationStyle.color = 'gold';
    notificationStyle.background = 'lightyellow';
  }

  return (
    <div style={notificationStyle}>
      {notification.message}
    </div>
  );
};

export default Notification;