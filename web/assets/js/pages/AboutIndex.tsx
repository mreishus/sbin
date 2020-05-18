import React from "react";

export const AboutIndex = () => {
  const linkClasses = "underline text-blue-300";
  return (
    <div className="container mx-auto m-4 px-2">
      <div className="max-w-lg mx-auto">
        <h2 className="text-xl text-green-300">overview</h2>
        <p className="font-semibold mt-2">
          sbin is an open source encrypted paste-bin, where the server has zero
          knowledge of pasted data.
        </p>
        <p className="mt-2">
          sbin is inspired by{" "}
          <a href="https://privatebin.info/" className={linkClasses}>
            privatebin
          </a>{" "}
          and its predecessor{" "}
          <a
            href="https://sebsauvage.net/wiki/doku.php?id=php:zerobin"
            className={linkClasses}
          >
            zerobin
          </a>
          , but uses its own code. it uses postgres, elixir, phoenix, typescript
          and react.
        </p>
        <h2 className="text-xl mt-2 text-green-300">encryption</h2>
        <p className="mt-2">
          when making a new paste, the javascript client chooses a random
          password to encrypt the data with before sending it to the server. the
          server stores the encrypted data only; it does not know the password
          to decrypt it. the password is inside the URL shown to the user. since
          the password is inside the fragment of the url after the hash, it is
          never sent to the server.
        </p>
        <p className="mt-2">
          when reading a paste, the server sends the encrypted data to the
          browser, which will use the password embedded in the URL to attempt to
          decrypt the contents. if the password is wrong, the browser will only
          display gibberish.
        </p>
        <h2 className="text-xl mt-2 text-green-300">source code</h2>
        <p className="mt-2">
          <a href="https://github.com/mreishus/sbin/" className={linkClasses}>
            sbin on github
          </a>
        </p>
        <h2 className="text-xl mt-2 text-green-300">version</h2>
        <p className="mt-2">1.0.15</p>
      </div>
    </div>
  );
};
export default AboutIndex;
