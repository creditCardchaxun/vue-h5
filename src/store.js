import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'en-US',
    // minHeight:''
   },
  getters:{
    // minHeight: state => state.minHeight,
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
    },

    // setDefaultHeight(state){
    //   this.state.minHeight = (window.outerHeight/window.outerWidth * 10.8 - 7.2)+'rem'
    //  },

  },

});


