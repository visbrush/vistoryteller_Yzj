let calliopeService = 'calliope-service.idvxlab.com';
let applicationUrl = 'https://pingpong.datacalliope.com';
let calliopePingpangService = 'pingpong-api.datacalliope.com:8010'
let urlPrefix = process.env.NODE_ENV === 'production' ? `https://${calliopeService}:8002/api/v1` : 'http://localhost:7001/api/v1';

// let uploadDataPrefix = process.env.NODE_ENV === 'production' ? `https://${calliopePingpangService}` : 'http://localhost:6008';//todo  7001
// let uploadDataPrefix = process.env.NODE_ENV === 'production' ? `https://${calliopeLiteService}` : 'http://localhost:7001';//todo  7001
// let uploadDataPrefix ='https://pingpong-api.datacalliope.com:8010';//todo  7001
let uploadDataPrefix = `https://${calliopePingpangService}`;//todo  7001
// let uploadDataPrefix = process.env.NODE_ENV === 'production' ? `https://${calliopePingpangService}` : 'http://localhost:6200';//todo  7001

let activitiesPrefix = process.env.NODE_ENV === 'production' ? `https://${calliopeService}:8002/log/v1` : 'http://localhost:7001/log/v1';
let publicPrefix = process.env.NODE_ENV === 'production' ? applicationUrl : 'http://localhost:3000';
//let client_id = '033338f2-02a8-44d4-8d54-5173b4a864f9';
let client_id = '6dcd0f8b-6990-4d69-9018-29b3351aa6ff';
let accountIp = `https://account.datacalliope.com`
let logoutRedirectUrlIp = `https://service.datacalliope.com:8001`

let localURLPrefix = 'http://localhost:6039';
let recordURLPrefix = 'http://localhost:8000'

let ipURLPrefix = 'https://visline.idvxlab.com:6039'

const config = {
    url: {
        uploadFile: `${localURLPrefix}/upload`,
        generate: `${localURLPrefix}/generate`,
        generateNarJson: `${localURLPrefix}/generateNarJson`,
        recordVideo: `${recordURLPrefix}/recordVideo`,
        // uploadFile: `${ipURLPrefix}/upload`,
        // generate: `${ipURLPrefix}/generate`,
        // generateNarJson: `${ipURLPrefix}/generateNarJson`,
        // recordVideo: `${ipURLPrefix}/recordVideo`,
    }
}
export default config