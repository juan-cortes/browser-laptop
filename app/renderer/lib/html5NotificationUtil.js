/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

 /* global Notification */

// Actions
const appActions = require('../../../js/actions/appActions')

// Utils
const immutableUtil = require('../../common/state/immutableUtil')

const html5NotificationUtil = {
  createNotification: (title, options, timeout = 5000) => {
    console.log('\n!!! html5NotificationUtil.createNotification: ' + JSON.stringify({ title, options, timeout }, null, 2) + '\n')

    if (!title) {
      console.log('Title is not provided for the notification')
      return
    }

    options = immutableUtil.makeJS(options)

    const notification = new Notification(title, options)
    if (timeout) {
      setTimeout(notification.close.bind(notification), timeout)
    }

    notification.addEventListener('click', (e) => {
      const data = e.currentTarget.data
      appActions.onNativeNotificationClick(data)
    })

    notification.addEventListener('error', (e) => {
      const data = e.currentTarget.data
      console.log('notification error', data)
    })

// no timeout notification, sadly
  },

  onConfigCheck: () => {
    console.log('\n!!! html5NotificationUtil.onConfigCheck\n')
/* FIXME: ensure that HTML5 notifications are enabled for internal use
    notifier.configured((err, result) => {
      appActions.onUserModelLog(appConstants.APP_ON_NATIVE_NOTIFICATION_CONFIGURATION_CHECK, {err, result})
      appActions.onNativeNotificationConfigurationReport(!err && result)
    })
 */
    appActions.onNativeNotificationConfigurationReport(true)
  },

  onAllowedCheck: (serveP) => {
    console.log('\n!!! html5NotificationUtil.onAllowedCheck: ' + JSON.stringify({ serveP }, null, 2) + '\n')
/* FIXME: ensure that DND is not active
    notifier.enabled((err, result) => {
      appActions.onUserModelLog(appConstants.APP_ON_NATIVE_NOTIFICATION_ALLOWED_CHECK, {err, result})
      appActions.onNativeNotificationAllowedReport(!err && result, serveP)
    })
*/
    appActions.onNativeNotificationConfigurationReport(true)
  }
}

module.exports = html5NotificationUtil
