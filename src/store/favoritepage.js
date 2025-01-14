import axios from "axios";

export default {
  namespaced: true,
  state: {
    favorites:'',
    notfound: false,
  },
  mutations: {
    SET_FAVORITES(state,favorites){
      state.favorites = favorites
    },
    SET_NOTFOUND(state,notfound){
      state.notfound = notfound
    },
  },
  getters:{
    favorites (state) {
      return state.favorites
    }, 
    notfound (state) {
      return state.notfound
    }, 
  },
  actions: {
    async getAllFavorites({commit,rootGetters}){
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/Favorite`,
      {         
        headers: {
          'Authorization': 'Bearer ' + rootGetters['authentication/token']
        }
      })
      .then((res) =>{
        console.log(res.data)
        // console.log(res.data.content)
        commit("SET_NOTFOUND", false);
        commit("SET_FAVORITES", res.data.content);

      }).catch((err) => {
        if(err.response.status == 404){
          commit("SET_NOTFOUND", true);
        }
        console.log(err)
      })
    }
  }
}