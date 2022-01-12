/*
 * @Author: fzf404
 * @Date: 2022-01-12 12:33:27
 * @LastEditTime: 2022-01-12 12:36:34
 * @Description: description
 */
const puppeteer = require('puppeteer')

const studentId = '2108060114'
const password = '020614'

;(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('http://xg.sylu.edu.cn/SPCP/Web/')
  // 获得 Element
  const code = await page.$eval('#code-box', (el) => el.innerText)
  const idInput = await page.$('#StudentId')
  const passwdInput = await page.$('#Name')
  const codeInput = await page.$('#codeInput')
  // 填入值
  await idInput.type(studentId)
  await passwdInput.type(password)
  await codeInput.type(code)
  // 跳转 & 等待
  const loginButton = await page.$('#Submit')
  await loginButton.click()
  await page.waitForNavigation()
})()
