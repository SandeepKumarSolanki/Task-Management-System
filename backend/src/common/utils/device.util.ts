import { UAParser } from 'ua-parser-js';

export function parseDevice(userAgent: string) {

  // console.log("New UAParser: ", new UAParser().getResult())
  const parser = new UAParser(userAgent);
  // console.log("Parser: ", parser.getResult())
  return {
    browser: parser.getBrowser().name || 'Unknown',
    os: parser.getOS().name || 'Unknown',
    device_type: parser.getDevice().type || 'web',
  };
}