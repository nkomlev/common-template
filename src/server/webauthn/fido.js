const {Fido2Lib} = require('fido2-lib');

const fido = new Fido2Lib({
    timeout: 60000,
    //A unique identifier for your website. 'localhost' is okay for
    rpId: process.env.DOMAIN_NAME,

    //Human-readable title for your website
    rpName: process.env.NEXT_PUBLIC_APP_NAME,

    rpIcon: '/android-chrome-192x192.png',
    challengeSize: 128,
    attestation: 'none',
    cryptoParams: [-7, -257],
    authenticatorAttachment: 'platform',
    authenticatorRequireResidentKey: false,
    authenticatorUserVerification: 'required'
});

module.exports = {fido};