/*
 * @Author: fzf404
 * @Date: 2021-10-10 22:16:54
 * @LastEditTime: 2021-11-17 11:32:05
 * @Description: 错误处理
 */

// 获取url参数
const url_params = new URLSearchParams(window.location.search)

// 判断是否传入id参数
if (url_params.has('msg') && url_params.has('code') ) {
  // 编辑页面内容
  $('#msg').text(url_params.get('msg'))
  $('#code').text(url_params.get('code'))
}

if(url_params.has('href')){
  $('#return').attr('href',url_params.get('href'))
}