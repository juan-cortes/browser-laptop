/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

// Constants
const appConstants = require('../../../js/constants/appConstants')

// Utils
const {makeImmutable} = require('../../common/state/immutableUtil')
// const html5NotificationUtil = require('../../renderer/lib/html5NotificationUtil')
// const userModel = require('../api/userModel')

const html5NotificationReducer = (state, action, immutableAction) => {
  action = immutableAction || makeImmutable(action)

  switch (action.get('actionType')) {
    case appConstants.APP_NATIVE_NOTIFICATION_CREATE:
      {
/* FIXME
        windowActions.onNativeNotificationOpen(
          windowId,
          `Brave Ad: ${immediateWinner}`,
          {
            body: notificationText,
            data: {
              notificationUrl,
              notificationId: notificationTypes.ADS
            }
          }
        )
 */
        break
      }

    case appConstants.APP_ON_NATIVE_NOTIFICATION_CLICK:
      {
/* FIXME
        switch (data.get('notificationId')) {
          case notificationTypes.ADS:
            {
              // TODO what we want to open, for now we just open ad url
              tabs.maybeCreateTab(state, Immutable.fromJS({
                url: data.get('notificationUrl'),
                windowId: action.get('senderWindowId')
              }))
              break
            }
        }
 */
        break
      }

    case appConstants.APP_ON_NATIVE_NOTIFICATION_CHECK:
    case appConstants.APP_ON_NATIVE_NOTIFICATION_CONFIGURATION_CHECK:
    case appConstants.APP_ON_NATIVE_NOTIFICATION_CONFIGURATION_REPORT:
    case appConstants.APP_ON_NATIVE_NOTIFICATION_ALLOWED_CHECK:
    case appConstants.APP_ON_NATIVE_NOTIFICATION_ALLOWED_REPORT:
      {
/* FIXME
 */
        break
      }
  }
  return state
}

module.exports = html5NotificationReducer
