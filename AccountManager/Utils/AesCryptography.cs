using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace AccountManager.Utils
{
    public class AesCryptography
    {
        private byte[] key = { 75,49,191,102,76,105,31,188,56,100,11,84,40,107,20,225 };
        private byte[] iv = { 103,45,146,100,41,252,168,117,216,0,76,202,49,148,72,189 };

        public byte[] Encrypt(string password)
        {
            byte[] data = Encoding.ASCII.GetBytes(password);
            using (Aes algo = Aes.Create())
            {
                using (ICryptoTransform encryptor = algo.CreateEncryptor(key, iv))
                {
                    var cryptPass = Crypt(data, encryptor);
                    return cryptPass;
                }
            }
        }

        public string Decrypt(byte[] password)
        {
            var data = password;
            using (Aes algo = Aes.Create())
            {
                using (ICryptoTransform decryptor = algo.CreateDecryptor(key, iv))
                {
                    var decryptPass = Crypt(data, decryptor);
                    return Encoding.ASCII.GetString(decryptPass);
                }
            }
        }

        private byte[] Crypt(byte[] data, ICryptoTransform cryptor)
        {
            var ms = new MemoryStream();
            using (Stream cs = new CryptoStream(ms, cryptor, CryptoStreamMode.Write))
            {
                cs.Write(data, 0, data.Length);
            }
            return ms.ToArray();
        }
    }
}