import { createCipheriv, randomBytes } from "crypto";

/**
 * Generates a ZEGO Token 04
 * @param {number} appID - Your App ID
 * @param {string} userID - The User ID
 * @param {string} secret - Your 32-byte Server Secret
 * @param {number} effectiveTimeInSeconds - Token validity period
 * @param {string} payload - Optional JSON string for advanced privileges
 */
export function generateToken04(
  appID: number,
  userID: string,
  secret: string,
  effectiveTimeInSeconds: number,
  payload: string = ""
): string {
  // 1. Parameter Validation
  if (!appID || typeof appID !== "number") throw new Error("Invalid appID");
  if (!userID || typeof userID !== "string") throw new Error("Invalid userID");
  if (!secret) throw new Error("Secret is required");

  const secretBuffer = Buffer.from(secret, "utf8");
  if (secretBuffer.length !== 32) {
    throw new Error("Secret must be exactly 32 bytes when UTF-8 encoded");
  }

  const VERSION_FLAG = "04";
  const createTime = Math.floor(Date.now() / 1000);
  const tokenInfo = {
    app_id: appID,
    user_id: userID,
    nonce: randomBytes(4).readUInt32BE(0) % 2147483648,
    ctime: createTime,
    expire: createTime + effectiveTimeInSeconds,
    payload: payload || "",
  };

  // 2. AES-256-GCM Encryption
  const key = secretBuffer;
  const nonce = randomBytes(12); // GCM standard nonce length
  const cipher = createCipheriv("aes-256-gcm", key, nonce);

  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(tokenInfo), "utf8"),
    cipher.final(),
  ]);
  const encryptBuf = Buffer.concat([encrypted, cipher.getAuthTag()]);

  // 3. Binary Token Construction
  const b1 = Buffer.alloc(8);
  const b2 = Buffer.alloc(2);
  const b3 = Buffer.alloc(2);

  b1.writeBigInt64BE(BigInt(tokenInfo.expire), 0);
  b2.writeUInt16BE(nonce.length, 0);
  b3.writeUInt16BE(encryptBuf.length, 0);

  const buf = Buffer.concat([b1, b2, nonce, b3, encryptBuf, Buffer.from([1])]);

  return VERSION_FLAG + buf.toString("base64");
}
