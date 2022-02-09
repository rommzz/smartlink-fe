import Axios from "axios"

export default {
  install(Vue) {
    Vue.mixin({
      // eslint-disable-next-line no-unused-vars
      getInquiry() {  
        Axios.get('/inquiry').then(r => {
          console.log(r);
          return r
        }).catch(e => {
          console.log(e);
        })
      }
    })
  }
}