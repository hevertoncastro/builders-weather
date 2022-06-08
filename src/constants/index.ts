import {LanguagesType, UnitsType} from '~types/settings';

export default {
  // API URL's
  WEATHER_API_BASE_URL: (
    latitude: number,
    longitude: number,
    units: UnitsType,
    language: LanguagesType,
    apiKey: string,
  ) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&lang=${language}&appid=${apiKey}`,

  // MAPS
  INITIAL_LATITUDE: 0,
  INITIAL_LONGITUDE: 0,
  ZOOM: 12,
  HEADING: 0,
  PITCH: 0,
  ALTITUDE: 15000,

  // TEXTS
  TEXTS: {
    en: {
      SEARCH_TITLE: 'Search new place',
      SEARCH_PLACEHOLDER: 'Search',
      SETTINGS_TITLE: 'Settings',
      SETTINGS_LANGUAGE_LABEL: 'Language',
      SETTINGS_LANGUAGE_PLACEHOLDER: 'Select language',
      SETTINGS_UNITS_LABEL: 'Units',
      SETTINGS_UNITS_PLACEHOLDER: 'Select units',
      language: 'English',
      metric: 'Metric',
      imperial: 'Imperial',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      SETTINGS_THEME_LABEL: 'Theme',
      SETTINGS_THEME_PLACEHOLDER: 'Select theme',
      HUMIDITY: 'Humidity',
      WIND: 'Wind',
      VISIBILITY: 'Visibility',
    },
    pt_br: {
      SEARCH_TITLE: 'Buscar novo local',
      SEARCH_PLACEHOLDER: 'Buscar',
      SETTINGS_TITLE: 'Configurações',
      SETTINGS_LANGUAGE_LABEL: 'Idioma',
      SETTINGS_LANGUAGE_PLACEHOLDER: 'Selecione o idioma',
      SETTINGS_UNITS_LABEL: 'Unidades',
      SETTINGS_UNITS_PLACEHOLDER: 'Selecione a unidade',
      language: 'Português',
      metric: 'Métricas',
      imperial: 'Imperial',
      light: 'Claro',
      dark: 'Escuro',
      system: 'Sistema',
      SETTINGS_THEME_LABEL: 'Tema',
      SETTINGS_THEME_PLACEHOLDER: 'Selecione o tema',
      HUMIDITY: 'Umidade',
      WIND: 'Vento',
      VISIBILITY: 'Visibilidade',
    },
    es: {
      SEARCH_TITLE: 'Buscar nuevo lugar',
      SEARCH_PLACEHOLDER: 'Buscar',
      SETTINGS_TITLE: 'Configuración',
      SETTINGS_LANGUAGE_LABEL: 'Idioma',
      SETTINGS_LANGUAGE_PLACEHOLDER: 'Seleccione el idioma',
      SETTINGS_UNITS_LABEL: 'Unidades',
      SETTINGS_UNITS_PLACEHOLDER: 'Seleccione las unidades',
      language: 'Español',
      metric: 'Métricas',
      imperial: 'Imperial',
      light: 'Claro',
      dark: 'Oscuro',
      system: 'Sistema',
      SETTINGS_THEME_LABEL: 'Tema',
      SETTINGS_THEME_PLACEHOLDER: 'Seleccione el tema',
      HUMIDITY: 'Humedad',
      WIND: 'Viento',
      VISIBILITY: 'Visibilidad',
    },
    fr: {
      SEARCH_TITLE: 'Chercher un nouveau lieu',
      SEARCH_PLACEHOLDER: 'Chercher',
      SETTINGS_TITLE: 'Paramètres',
      SETTINGS_LANGUAGE_LABEL: 'Langue',
      SETTINGS_LANGUAGE_PLACEHOLDER: 'Sélectionner la langue',
      SETTINGS_UNITS_LABEL: 'Unités',
      SETTINGS_UNITS_PLACEHOLDER: 'Sélectionner les unités',
      language: 'Français',
      metric: 'Métriques',
      imperial: 'Impériales',
      light: 'Clair',
      dark: 'Foncé',
      system: 'Système',
      SETTINGS_THEME_LABEL: 'Thème',
      SETTINGS_THEME_PLACEHOLDER: 'Sélectionner le thème',
      HUMIDITY: 'Humidité',
      WIND: 'Vent',
      VISIBILITY: 'Visibilité',
    },
    ua: {
      SEARCH_TITLE: 'Пошук нового місця',
      SEARCH_PLACEHOLDER: 'Пошук',
      SETTINGS_TITLE: 'Налаштування',
      SETTINGS_LANGUAGE_LABEL: 'Мова',
      SETTINGS_LANGUAGE_PLACEHOLDER: 'Виберіть мову',
      SETTINGS_UNITS_LABEL: 'Одиниці',
      SETTINGS_UNITS_PLACEHOLDER: 'Виберіть одиниці',
      language: 'Українська',
      metric: 'Метричні',
      imperial: 'Імперські',
      light: 'Світло',
      dark: 'Темно',
      system: 'Система',
      SETTINGS_THEME_LABEL: 'Тема',
      SETTINGS_THEME_PLACEHOLDER: 'Виберіть тему',
      HUMIDITY: 'Вологість',
      WIND: 'Вітер',
      VISIBILITY: 'Видимість',
    },
    zh_cn: {
      SEARCH_TITLE: '搜索新的地方',
      SEARCH_PLACEHOLDER: '搜索',
      SETTINGS_TITLE: '设置',
      SETTINGS_LANGUAGE_LABEL: '语言',
      SETTINGS_LANGUAGE_PLACEHOLDER: '选择语言',
      SETTINGS_UNITS_LABEL: '单位',
      SETTINGS_UNITS_PLACEHOLDER: '选择单位',
      language: '中文',
      metric: '公制',
      imperial: '英制',
      light: '轻',
      dark: '暗',
      system: '系统',
      SETTINGS_THEME_LABEL: '主题',
      SETTINGS_THEME_PLACEHOLDER: '选择主题',
      HUMIDITY: '湿度',
      WIND: '风',
      VISIBILITY: '能见度',
    },
  },

  WEATHER_ICONS: {
    200: {
      day: require('@assets/icons/11d.png'),
      night: require('@assets/icons/11n.png'),
    },
    201: {
      day: require('@assets/icons/11d.png'),
      night: require('@assets/icons/11n.png'),
    },
    202: {
      day: require('@assets/icons/11d.png'),
      night: require('@assets/icons/11n.png'),
    },
    210: {
      day: require('@assets/icons/11d.png'),
      night: require('@assets/icons/11n.png'),
    },
    211: {
      day: require('@assets/icons/11d.png'),
      night: require('@assets/icons/11n.png'),
    },
    212: {
      day: require('@assets/icons/11d.png'),
      night: require('@assets/icons/11n.png'),
    },
    221: {
      day: require('@assets/icons/11d.png'),
      night: require('@assets/icons/11n.png'),
    },
    230: {
      day: require('@assets/icons/11d.png'),
      night: require('@assets/icons/11n.png'),
    },
    231: {
      day: require('@assets/icons/11d.png'),
      night: require('@assets/icons/11n.png'),
    },
    232: {
      day: require('@assets/icons/11d.png'),
      night: require('@assets/icons/11n.png'),
    },

    300: {
      day: require('@assets/icons/09d.png'),
      night: require('@assets/icons/09n.png'),
    },
    301: {
      day: require('@assets/icons/09d.png'),
      night: require('@assets/icons/09n.png'),
    },
    302: {
      day: require('@assets/icons/09d.png'),
      night: require('@assets/icons/09n.png'),
    },
    310: {
      day: require('@assets/icons/09d.png'),
      night: require('@assets/icons/09n.png'),
    },
    311: {
      day: require('@assets/icons/09d.png'),
      night: require('@assets/icons/09n.png'),
    },
    312: {
      day: require('@assets/icons/09d.png'),
      night: require('@assets/icons/09n.png'),
    },
    313: {
      day: require('@assets/icons/09d.png'),
      night: require('@assets/icons/09n.png'),
    },
    314: {
      day: require('@assets/icons/09d.png'),
      night: require('@assets/icons/09n.png'),
    },
    321: {
      day: require('@assets/icons/09d.png'),
      night: require('@assets/icons/09n.png'),
    },

    500: {
      day: require('@assets/icons/10d.png'),
      night: require('@assets/icons/10n.png'),
    },
    501: {
      day: require('@assets/icons/10d.png'),
      night: require('@assets/icons/10n.png'),
    },
    502: {
      day: require('@assets/icons/10d.png'),
      night: require('@assets/icons/10n.png'),
    },
    503: {
      day: require('@assets/icons/10d.png'),
      night: require('@assets/icons/10n.png'),
    },
    504: {
      day: require('@assets/icons/10d.png'),
      night: require('@assets/icons/10n.png'),
    },
    511: {
      day: require('@assets/icons/13d.png'),
      night: require('@assets/icons/13n.png'),
    },
    520: {
      day: require('@assets/icons/09d.png'),
      night: require('@assets/icons/09n.png'),
    },
    521: {
      day: require('@assets/icons/09d.png'),
      night: require('@assets/icons/09n.png'),
    },
    522: {
      day: require('@assets/icons/09d.png'),
      night: require('@assets/icons/09n.png'),
    },
    531: {
      day: require('@assets/icons/09d.png'),
      night: require('@assets/icons/09n.png'),
    },

    600: {
      day: require('@assets/icons/13d.png'),
      night: require('@assets/icons/13n.png'),
    },
    601: {
      day: require('@assets/icons/13d.png'),
      night: require('@assets/icons/13n.png'),
    },
    602: {
      day: require('@assets/icons/13d.png'),
      night: require('@assets/icons/13n.png'),
    },
    611: {
      day: require('@assets/icons/13d.png'),
      night: require('@assets/icons/13n.png'),
    },
    612: {
      day: require('@assets/icons/13d.png'),
      night: require('@assets/icons/13n.png'),
    },
    613: {
      day: require('@assets/icons/13d.png'),
      night: require('@assets/icons/13n.png'),
    },
    615: {
      day: require('@assets/icons/13d.png'),
      night: require('@assets/icons/13n.png'),
    },
    616: {
      day: require('@assets/icons/13d.png'),
      night: require('@assets/icons/13n.png'),
    },
    620: {
      day: require('@assets/icons/13d.png'),
      night: require('@assets/icons/13n.png'),
    },
    621: {
      day: require('@assets/icons/13d.png'),
      night: require('@assets/icons/13n.png'),
    },
    622: {
      day: require('@assets/icons/13d.png'),
      night: require('@assets/icons/13n.png'),
    },

    701: {
      day: require('@assets/icons/50d.png'),
      night: require('@assets/icons/50n.png'),
    },
    711: {
      day: require('@assets/icons/50d.png'),
      night: require('@assets/icons/50n.png'),
    },
    721: {
      day: require('@assets/icons/50d.png'),
      night: require('@assets/icons/50n.png'),
    },
    731: {
      day: require('@assets/icons/50d.png'),
      night: require('@assets/icons/50n.png'),
    },
    741: {
      day: require('@assets/icons/50d.png'),
      night: require('@assets/icons/50n.png'),
    },
    751: {
      day: require('@assets/icons/50d.png'),
      night: require('@assets/icons/50n.png'),
    },
    761: {
      day: require('@assets/icons/50d.png'),
      night: require('@assets/icons/50n.png'),
    },
    762: {
      day: require('@assets/icons/50d.png'),
      night: require('@assets/icons/50n.png'),
    },
    771: {
      day: require('@assets/icons/50d.png'),
      night: require('@assets/icons/50n.png'),
    },
    781: {
      day: require('@assets/icons/50d.png'),
      night: require('@assets/icons/50n.png'),
    },

    800: {
      day: require('@assets/icons/01d.png'),
      night: require('@assets/icons/01n.png'),
    },
    801: {
      day: require('@assets/icons/02d.png'),
      night: require('@assets/icons/02n.png'),
    },
    802: {
      day: require('@assets/icons/03d.png'),
      night: require('@assets/icons/03n.png'),
    },
    803: {
      day: require('@assets/icons/04d.png'),
      night: require('@assets/icons/04n.png'),
    },
    804: {
      day: require('@assets/icons/04d.png'),
      night: require('@assets/icons/04n.png'),
    },
  } as {[key: number]: {day: any; night: any}},
};
