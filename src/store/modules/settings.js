import i18n from '../../i18n';

export default {
    state: {
        locale: 'en',
        perPage: 10,
    },

    mutations: {

        INIT_SETTINGS() {

            let settings = JSON.parse(localStorage.getItem('settings'))

            if (settings) {

                if (settings.locale) {
                    i18n.locale = settings.locale
                }
            }
        },

        //обновление соотв. значения
        UPDATE_SETTINGS_FIELD(state, payload) {
            state[payload.key] = payload.value

            //сохраняем в localStorage
            let settings = JSON.parse(localStorage.getItem('settings')) || {}
            settings.locale = payload.value
            localStorage.setItem('settings', JSON.stringify(settings));

            if (payload.key == 'locale') {
                i18n.locale = payload.value
            }
        },
    },
}