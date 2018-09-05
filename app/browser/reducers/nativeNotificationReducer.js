/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

const notifier = require('brave-ads-notifier')
const os = require('os')

// Actions
const appActions = require('../../../js/actions/appActions')

// Constants
const appConstants = require('../../../js/constants/appConstants')
const settings = require('../../../js/constants/settings')

// State
const windows = require('../windows')
const userModelState = require('../../common/state/userModelState')
const Immutable = require('immutable')

// Utils
const {makeImmutable} = require('../../common/state/immutableUtil')
const notificationUtil = require('../../renderer/lib/notificationUtil')
const userModel = require('../api/userModel')

const type = os.type()
const html5P = ('Windows_NT' || type) === 'Windows_NT'

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

const externalNotificationReducer = (state, action, immutableAction) => {
  action = immutableAction || makeImmutable(action)
  switch (action.get('actionType')) {
    case appConstants.APP_NATIVE_NOTIFICATION_CREATE:
      {
        notificationUtil.createNotification(action.get('options'))
        break
      }
    case appConstants.APP_ON_NATIVE_NOTIFICATION_CHECK:
      {
        if (!notifier.available()) {
          state = userModelState.setUserModelValue(state, 'available', false)
        } else {
          state = userModelState.setUserModelValue(state, 'available', true)
        }
        notificationUtil.onConfigCheck()
        notificationUtil.onAllowedCheck(!!action.get('serveP'))
        break
      }
    case appConstants.APP_ON_NATIVE_NOTIFICATION_CONFIGURATION_CHECK:
      {
        notificationUtil.onConfigCheck()
        break
      }
    case appConstants.APP_ON_NATIVE_NOTIFICATION_CONFIGURATION_REPORT:
      {
        const ok = !!action.get('ok')
        const previous = userModelState.getUserModelValue(state, 'configured')

        if (ok !== previous) state = userModelState.setUserModelValue(state, 'configured', ok)

        if (!ok) appActions.changeSetting(settings.ADS_ENABLED, false)
        break
      }
    case appConstants.APP_ON_NATIVE_NOTIFICATION_ALLOWED_CHECK:
      {
        notificationUtil.onAllowedCheck(!!action.get('serveP'))
        break
      }
    case appConstants.APP_ON_NATIVE_NOTIFICATION_ALLOWED_REPORT:
      {
        const ok = !!action.get('ok')
        const previous = userModelState.getUserModelValue(state, 'allowed')
        const serveP = !!action.get('serveP')

        if (ok !== previous) state = userModelState.setUserModelValue(state, 'allowed', ok)
        if ((!serveP) || (ok !== previous)) {
          const action = Immutable.fromJS({
            actionType: appConstants.APP_CHANGE_SETTING,
            key: settings.ADS_ENABLED,
            value: ok
          })

          state = userModel.generateAdReportingEvent(state, 'settings', action)
        }
        if (!serveP) break

        if (ok) {
          state = userModel.checkReadyAdServe(state, windows.getActiveWindowId())
        } else {
          appActions.onUserModelLog('Ad not served', { reason: 'notifications not presently allowed' })
        }
        break
      }
  }

  return state
}

module.exports = (state, action, immutableAction) => {
  return (html5P ? html5NotificationReducer(state, action, immutableAction)
                 : externalNotificationReducer(state, action, immutableAction))
}
