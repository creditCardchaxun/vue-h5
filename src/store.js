import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'en-US',
    // mapList:[]
  },
  getters:{
     mapList: state => state.mapList,
  },
  mutations: {
    setDefaultLang() {
      if (window.navigator && window.navigator.language.includes('zh')) {
        this.commit('changeLang','zh-CN') 
        // this.commit('changeLangs','EN') 
      } else {
        this.commit('changeLang','en-US') 
        // this.commit('changeLangs','zh-CN') 
      }
    },
    changeLang(state,playload){
      state.lang = playload
      // axios.defaults.headers.common['systype'] = playload
    },
    // SET_MAP(state, mapList){
    //     if (mapList) {
    //       state.mapList = mapList;
    //     } else {
    //       state.mapList = null;
    //     }
    //   }
  },
  // actions: {
  //   setLocation: ({commit}, mapList) => {
  //     commit('SET_MAP', mapList);
  //   },
  // },


});

// export default new Vuex.Store({
//   state,
//   getters,
//   mutations,
//   actions
// });
