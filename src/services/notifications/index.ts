/**
 * Notifications Service
 *
 * TODO: Replace with actual backend API calls
 * Currently using placeholder functions from api-client
 */

import {
  fetchNotifications as fetchNotificationsAPI,
  markNotificationAsRead,
} from "@/lib/api-client";
import { Notification } from "./types";

export async function fetchNotifications({
  staffId,
}: {
  staffId: string;
}): Promise<Notification[]> {
  // TODO: Replace with actual API call
  // const response = await fetchNotificationsAPI({ staffId });

  console.warn(
    "fetchNotifications: Using placeholder - replace with actual API call",
  );

  return [];
}

export async function deleteNotification({
  notificationId,
}: {
  notificationId: string;
}) {
  // TODO: Replace with actual API call
  // await markNotificationAsRead(notificationId);

  console.warn(
    "deleteNotification: Using placeholder - replace with actual API call",
  );

  return;
}

export async function fetchNotificationsCount({
  staffId,
}: {
  staffId: string;
}): Promise<number> {
  // TODO: Replace with actual API call
  // const response = await fetchNotificationsAPI({ staffId, unreadOnly: true });

  console.warn(
    "fetchNotificationsCount: Using placeholder - replace with actual API call",
  );

  return 0;
}
