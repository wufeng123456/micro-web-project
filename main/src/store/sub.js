import { loading } from '../store'
import * as appInfo from '../store'

export const subNavList = [
  {
    name: 'react16',
    entry: '//localhost:9001/',
    loading,
    container: '#micro-container',
    activeRule: '/react16',
    appInfo,
  },
  {
    name: 'vue3',
    entry: '//localhost:9002/',
    loading,
    container: '#micro-container',
    activeRule: '/vue3',
    appInfo,
  },
];

