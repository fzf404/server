const fs = require('fs')
const moment = require('moment')
const Papa = require('papaparse')
const puppeteer = require('puppeteer')
const debug = require('puppeteer-debug')

// 日志
const logFile = fs.createWriteStream('logs/auto-report.log', {
  flags: 'a', // 追加写入
  encoding: 'utf-8', // utf8编码
})
const logger = new console.Console(logFile, logFile)
// 数据
const data = fs.readFileSync('data/auto-report.csv', 'utf-8')

const report = async (userInfo) => {
  // 开启浏览器
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    executablePath: '/usr/bin/chromium-browser',
  })
  // const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  // 用户信息
  const studentId = userInfo[0]
  const password = userInfo[1]
  const userName = userInfo[2]
  // 登录
  try {
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
  } catch (error) {
    console.log(`${moment().format('YYYY/MM/DD hh:mm:ss')} - ERROR - ${studentId}/${userName}: 登录失败`)
    logger.log(`${moment().format('YYYY/MM/DD hh:mm:ss')} - ERROR - ${studentId}/${userName}: 登录失败`)
    // 关闭浏览器
    await browser.close()
    return
  }

  // 跳转到填报界面
  try {
    const reportElement = await page.$('#platfrom2')
    await reportElement.click()
  } catch (error) {
    console.log(`${moment().format('YYYY/MM/DD hh:mm:ss')} - ERROR - ${studentId}/${userName}: 跳转失败`)
    logger.log(`${moment().format('YYYY/MM/DD hh:mm:ss')} - ERROR - ${studentId}/${userName}: 跳转失败`)
    // 关闭浏览器
    await browser.close()
    return
  }

  // 填报
  try {
    // 等待跳转
    await page.waitForNavigation()
    // 操作Dom
    await page.evaluate(() => {
      $('#form1 > div.Table_list > div:nth-child(4) > div.th_right > select:nth-child(4) > option:nth-child(2)').attr(
        'selected',
        true
      )
      $(
        '#form1 > div.Table_list > div:nth-child(4) > div.th_right > select:nth-child(2) > option[selected="selected"]'
      ).text($('#ProvinceName').val())
      $(
        '#form1 > div.Table_list > div:nth-child(4) > div.th_right > select:nth-child(3) > option[selected="selected"]'
      ).text($('#CityName').val())
      $(
        '#form1 > div.Table_list > div:nth-child(4) > div.th_right > select:nth-child(4) > option[selected="selected"]'
      ).text($('#CountyName').val())
    })
    const promiseButton = await page.$('#ckCLS')
    await promiseButton.click()
    const submitButton = await page.$('#SaveBtnDiv > button')
    await submitButton.click()
    // 等待成功界面
    await page.waitForSelector('#layui-m-layer0')
  } catch (error) {
    console.log(`${moment().format('YYYY/MM/DD hh:mm:ss')} - ERROR - ${studentId}/${userName}: 填报失败`)
    logger.log(`${moment().format('YYYY/MM/DD hh:mm:ss')} - ERROR - ${studentId}/${userName}: 填报失败`)
    // 关闭浏览器
    await browser.close()
    return
  }
  // 调试
  // await debug({ browser, page })
  console.log(`${moment().format('YYYY/MM/DD hh:mm:ss')} - INFO - ${studentId}/${userName}: 填报成功`)
  await browser.close()
}

Papa.parse(data, {
  complete: async (results) => {
    // 读取全部用户信息
    results.data.pop()
    const data = results.data
    // 遍历
    for (let item in data) {
      await report(data[item])
    }
  },
})
