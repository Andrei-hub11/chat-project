import React from "react";
import {
  NotificationContainer,
  NotificationContainerBtn,
  Notifications,
  NotificationsBtn,
  NotificationSubContainer,
  NotificationUsername,
} from "./NotificationsStyle";

export const Notification = ({
  notifications,
  onResponseToRequester,
  onClearingNotifications,
  closeMenu,
}) => {
  return (
    <Notifications
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.3, 0.5, 0.7, 1],
        transition: { duration: 1 },
      }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {notifications?.map((alert) => {
        return (
          <NotificationContainer
            key={alert._id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.3, 0.5, 0.7, 1],
              transition: { duration: 1, delay: 0.2 },
            }}
            exit={{ x: 100, opacity: 0, transition: { duration: 0.3 } }}
          >
            <NotificationSubContainer>
              <NotificationUsername>{alert.alert}</NotificationUsername>
            </NotificationSubContainer>
            {alert.type === "request" ? (
              <NotificationContainerBtn>
                <NotificationsBtn
                  primary={true}
                  onClick={() => {
                    onResponseToRequester(alert, "accepted");
                    closeMenu("notifications");
                    onClearingNotifications(alert._id);
                  }}
                >
                  Aceitar
                </NotificationsBtn>
                <NotificationsBtn
                  primary={false}
                  onClick={() => {
                    onResponseToRequester(alert, "reject");
                    closeMenu("notifications");
                    onClearingNotifications(alert._id);
                  }}
                >
                  Recusar
                </NotificationsBtn>
              </NotificationContainerBtn>
            ) : (
              <NotificationContainerBtn>
                <NotificationsBtn
                  primary={true}
                  onClick={() => {
                    closeMenu("notifications");
                    onClearingNotifications(alert._id);
                  }}
                >
                  Ok
                </NotificationsBtn>
              </NotificationContainerBtn>
            )}
          </NotificationContainer>
        );
      })}
    </Notifications>
  );
};
