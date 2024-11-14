<template>
  <div class="d-flex align-center">
    <v-btn class="secondary-button greyed-out small-button font-26">
      <i class="icon-info"></i>
    </v-btn>

    <v-menu transition="scale-transition" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-badge
          v-if="notification_items.length > 0"
          color="error"
          dot
          offset-x="-2"
          offset-y="-2"
          v-bind="props"
          class="secondary-button greyed-out small-button mar-l-12"
        >
          <i class="icon-notification"></i>
        </v-badge>

        <v-img
          v-else
          :width="25"
          aspect-ratio="16/9"
          cover
          :src="Notification"
          v-bind="props"
        ></v-img>
      </template>

      <v-list class="notifications-popup">
        <div class="d-flex justify-space-between mar-b-26">
          <p class="notifications-title">Notifications</p>
          <v-btn :ripple="false" class="mark-allread-button" variant="text">
            <i class="icon-double-tick"></i>
            <span>Mark as all reads</span>
          </v-btn>
        </div>

        <template v-if="notification_items.length > 0">
          <v-tabs class="notifications-tabs" v-model="notificationTab">
            <v-tab value="all">
              All
              <span class="notifications-count">20</span>
            </v-tab>
            <v-tab value="recommendations">Recommendations</v-tab>
          </v-tabs>

          <v-tabs-window v-model="notificationTab">
            <v-tabs-window-item value="all">
              <div class="notifications-tiles">
                <div class="notifications-tile unread">
                  <div class="notifications-tile-wrapper">
                    <div class="notifications-tile-icon">
                      <img src="@/assets/images/logo-T.png" alt="" />

                      <i class="icon-clipboard">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                      </i>
                    </div>

                    <div class="notifications-content">
                      <span class="text-unemphed">2 days ago</span>

                      <p class="main-text">
                        Sofware Engineer 2
                        <span class="text-unemphed">
                          job is recommended by
                        </span>

                        <span class="notifications-source">
                          Takafo Hiring Team
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="notifications-tile">
                  <div class="notifications-tile-wrapper">
                    <div class="notifications-tile-icon">
                      <img src="@/assets/images/logo-T.png" alt="" />

                      <i class="icon-clipboard">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                      </i>
                    </div>
                    <div class="notifications-content">
                      <span class="text-unemphed">2 days ago</span>
                      <p class="main-text">
                        Sofware Engineer 2
                        <span class="text-unemphed">
                          job is recommended by
                        </span>
                        <span class="notifications-source"
                          >Takafo Hiring Team</span
                        >
                      </p>
                    </div>
                  </div>
                </div>

                <div class="notifications-tile">
                  <div class="notifications-tile-wrapper">
                    <div class="notifications-tile-icon">
                      <img src="@/assets/images/logo-T.png" alt="" />

                      <i class="icon-clipboard">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                      </i>
                    </div>
                    <div class="notifications-content">
                      <span class="text-unemphed">2 days ago</span>
                      <p class="main-text">
                        Sofware Engineer 2
                        <span class="text-unemphed">
                          job is recommended by
                        </span>
                        <span class="notifications-source"
                          >Takafo Hiring Team</span
                        >
                        <v-btn>view</v-btn>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </v-tabs-window-item>

            <v-tabs-window-item value="recommendations">
              Recommendations feature not available yet.
            </v-tabs-window-item>
          </v-tabs-window>
        </template>

        <template v-else>
          <NoNotification />
        </template>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NoNotification from '@/components/navbar/NoNotification.vue';
import Notification from '@/assets/notification.png';

const notificationTab = ref('');

const notification_items = [
  { id: 1, message: 'You have been invited for the interview, Gear up' },
  { id: 2, message: 'You have been invited for the interview, Gear up' },
  { id: 3, message: 'You have been invited for the interview, Gear up' },
  { id: 4, message: 'You have been invited for the interview, Gear up' },
];

const notification_navigate = (notificationId: number) => {
  console.log('navigate notification');
};

const dismiss_notification = (notificationId: number) => {
  console.log('dismiss notification');
};

const markAllRead = () => {
  console.log('Read all Notification');
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/responsive';
@import '@/assets/styles/scss/mixins';

.notifications-popup,
.v-menu > .v-overlay__content > .v-list {
  border-radius: $card-radius;
  padding: 24px;
  box-shadow: 0px 6px 32px 0px rgba(4, 4, 226, 0.078);
  transform: translateY(0.75rem);
}

.notifications-popup {
  @include desktop {
    width: 29rem;
    min-height: 29rem;
  }

  .notifications-title {
    font-size: 1.25rem;
    font-weight: 700;
    font-family: $font-family-urbanist;
  }

  .mark-allread-button {
    color: lightColor(primary);
    font-size: 0.75rem;
    font-weight: 400;
    background: none;

    i.icon-double-tick {
      font-size: 1rem;
      margin-right: 0.25rem;
    }
  }

  .notifications-tiles {
    .notifications-tile {
      padding: 0.5rem;
      border-radius: $card-tile-radius;
      position: relative;

      &:not(:first-of-type) {
        margin-top: 0.75rem;
      }

      &.unread:after {
        content: '';
        @include centralize-absolute-y;
        background: $primary-gradient;
        width: 0.375rem;
        height: 0.375rem;
        border-radius: 50%;
        right: 1rem;
      }

      .notifications-tile-wrapper {
        display: flex;
        align-items: flex-start;
        padding-right: 4.625rem;

        .notifications-tile-icon {
          width: 3.25rem;
          aspect-ratio: 1/1;
          height: 3.25rem;
          @include centralize-flex;
          background: lightColor(light-background);
          border-radius: $card-badge-radius;
          margin-right: 0.75rem;
          position: relative;

          img {
            width: 2rem;
          }

          i.icon-clipboard {
            color: lightColor(primary);
            position: absolute;
            top: -3px;
            right: -3px;
            font-size: 0.5rem;
            padding: 3px;
            border-radius: 50%;
            background: lightColor(white);
            border: 1px solid lightColor(light-background);
          }
        }

        .notifications-content {
          .text-unemphed {
            font-size: 0.625rem;
          }

          .main-text {
            font-weight: 500;
            font-size: 0.75rem;

            .text-unemphed {
              font-size: 0.75rem;
              font-weight: 400;
            }
          }

          .v-btn {
            text-decoration: underline;
            color: lightColor(primary);
            background: none;
            padding: 0;
            box-shadow: none;
            font-size: 0.75rem;
            min-width: unset;
            width: unset;
            margin-left: 0.25rem;
            position: relative;
            top: -1px;

            &:hover {
              ::v-deep(.v-btn__overlay) {
                background: none;
              }
            }
          }
        }
      }

      &:hover,
      &.unread {
        background: lightColor(light-background);
        border-left: 1px solid lightColor(primary);

        .notifications-tile-icon {
          background: lightColor(white);
        }
      }
    }
  }

  .notifications-tabs {
    margin-bottom: 1.5rem;

    .v-btn {
      color: lightColor(disabled);
      font-weight: 500;
      padding-left: 0;
      padding-right: 0;
      width: unset;
      min-width: unset;

      ::v-deep(.v-btn__overlay) {
        background: none;
      }

      &:not(:first-of-type) {
        margin-left: 1.5rem;
      }

      .notifications-count {
        font-size: 0.625rem;
        border-radius: 0.375rem;
        background: lightColor(light-background);
        padding: 0.25rem 0.375rem;
        margin-left: 0.375rem;
      }

      &.v-tab-item--selected,
      &:hover {
        color: lightColor(primary);
        font-weight: 600;
      }
    }
  }
}

.v-badge {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
}

.font-26 {
  font-size: 26px;
}
</style>
