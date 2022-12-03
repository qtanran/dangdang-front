import { defineConfig, CommonServerOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
const fs =  require('fs')
const dotenv = require('dotenv')
import { DotenvParseOutput } from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig(mode => {
  const envFileName:string = '.env'
  const curEnvFileName = `${envFileName}.${mode.mode}`
  let server: CommonServerOptions = {}
  const envData = fs.readFileSync(curEnvFileName)
  const envMap: DotenvParseOutput = dotenv.parse(envData)
  console.log(envMap);
  if (mode.mode === 'development') {
    server = {
      proxy: {
        [envMap.VITE_BASE_URL]: {
          target: 'http://192.168.11.1'
        }
      }
    }
  } else if (mode.mode === 'production') {
    console.log('生产者环境');
  }
  return {
    plugins: [vue()],
    server
  }
})
