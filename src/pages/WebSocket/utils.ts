import Recorder from 'recorder-core/recorder.wav.min';

export const BASE_WS_URL = 'ws://136.29.31.111:18888/ycWebSocket';
// export const BASE_WS_URL = 'wss://136.30.130.132:30118/ycWebSocket';
export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export const ReadyStateMap = {
  [ReadyState.Connecting]: '连接中',
  [ReadyState.Open]: '连接成功',
  [ReadyState.Closing]: '连接关闭中',
  [ReadyState.Closed]: '连接已关闭或连接失败',
};

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function generateRandomString(length: number = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function initOpen(clientId, sessionId) {
  const obj = {
    commandId: '100001',
    clientId,
    sessionId,
    jsonContent: {
      clientId,
      sessionId,
      digitalHumanId: 'b86863a244e24f18be79502fa685842a',
      scenarioId: null,
      customerServiceId: null,
      clientVideoUrl: 'rtsp://10.128.22.20:5544/49c88a90ad6e4238a663ef948db16f5a',
      hasVirtualImage: false,
      clientType: 'AI_ASSISTANT',
      clientSystemType: 'WINDOWS',
      videoSize: null,
      clientName: 'DESKTOP-UVP2VO8-YC',
      visibility: 'VISIBLE',
      greeting: 'GREET',
      staFbxMode: 'BVH',
      userId: null,
      serverAddress: '10.128.165.14:8082',
      deviceType: 'PC',
      version: null,
      token: null,
      dcsCmsIp: null,
      dcsCmsPort: 0,
      dcsEssIp: null,
      dcsEssPort: 0,
      dcsUserName: null,
      dcsPasswd: null,
      dcsDeviceId: null,
      deviceId: null,
      osVersion: 'Microsoft Windows NT 6.2.9200.0',
    },
  };
  return JSON.stringify(obj);
}
let mediaRecorder: MediaRecorder;

let audioChunks: any[] = [];

let rec: any;
export async function startRecordr() {
  try {
    // const constraints = {
    //   audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 8000, bitRate: 8 },
    // };
    // const stream = await navigator.mediaDevices.getUserMedia(constraints);
    // const options = { mimeType: 'audio/webm; codecs=opus' };
    // mediaRecorder = new MediaRecorder(stream, options);

    // mediaRecorder.ondataavailable = (event) => {
    //   if (event.data.size > 0) {
    //     audioChunks.push(event.data);
    //   }
    // };
    // mediaRecorder.start();

    rec = Recorder({
      //本配置参数请参考下面的文档，有详细介绍
      type: 'wav',
      sampleRate: 8000,
      bitRate: 16, //mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把格式支持文件加载进来，比如使用wav格式需要提前加载wav.js编码引擎
    });

    rec.open(
      function () {
        //打开麦克风授权获得相关资源
        //rec.start() 此处可以立即开始录音，但不建议这样编写，因为open是一个延迟漫长的操作，通过两次用户操作来分别调用open和start是推荐的最佳流程
        rec.start();
      },
      function (msg, isUserNotAllow) {
        //用户拒绝未授权或不支持
        console.log((isUserNotAllow ? 'UserNotAllow，' : '') + '无法录音:' + msg);
      },
    );

    rec.start();
  } catch (e) {
    console.error('录音失败:', e);
  }
}
export async function stopRecordr(cb) {
  // audioChunks = [];
  // if (!mediaRecorder) return '';
  // mediaRecorder.stop();
  // mediaRecorder.onstop = async () => {
  //   const audioBlob = new Blob(audioChunks, { type: 'audio/ogg; codecs=opus' });
  //   const base64String = await blobToBase64(audioBlob);
  //   cb?.(base64String);
  // };

  rec.stop(
    async function (blob, duration) {
      //简单利用URL生成本地文件地址，注意不用了时需要revokeObjectURL，否则霸占内存
      //此地址只能本地使用，比如赋值给audio.src进行播放，赋值给a.href然后a.click()进行下载（a需提供download="xxx.mp3"属性）
      console.log('时长:' + duration + 'ms');
      rec.close(); //释放录音资源，当然可以不释放，后面可以连续调用start；但不释放时系统或浏览器会一直提示在录音，最佳操作是录完就close掉
      rec = null;

      //已经拿到blob文件对象想干嘛就干嘛：立即播放、上传、下载保存
      const base64String = await blobToBase64(blob);
      console.log('==base64String====>', base64String);
      cb?.(base64String);
    },
    function (msg) {
      console.log('录音失败:' + msg);
      rec.close(); //可以通过stop方法的第3个参数来自动调用close
      rec = null;
    },
  );
}
