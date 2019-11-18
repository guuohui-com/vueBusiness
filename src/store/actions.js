//给action注册事件处理函数
export function setUserInfo({commit},user) {
  return commit('setUserInfo',user);
}
export function setProductId({commit},id) {
  return commit('setProductId',id);
}
export function setCategoryId({commit},id) {
  return commit('setCategoryId',id);
}

export function setIsShowFooterBar({commit},isShow) {
  return commit('setIsShowFooterBar',isShow);
}
