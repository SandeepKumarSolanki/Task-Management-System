import type { Request } from "express";

export function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
//   console.log("Ip utils forwarded : ",forwarded)

  if (forwarded) {
    return (forwarded as string).split(',')[0];
  }

  const ipAddress = req.socket?.remoteAddress ||
    req.ip ||
    '0.0.0.0'
    // console.log("Ip Address: ", ipAddress)
    return ipAddress;
//   return (
//     req.socket?.remoteAddress ||
//     req.ip ||
//     '0.0.0.0'
//   );
}
