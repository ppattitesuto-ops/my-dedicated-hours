// 🌐 src/firebase.ts （Googleクラウドと通信するための絶対の基地）
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🛡️ 【注意！】ここには、あなたがブラウザの画面で確認した「本物の」設定オブジェクト（apiKeyを含む本物の値）を丸ごと上書きして貼り付けてください！
const firebaseConfig = {
  apiKey: "AIzaSyC0b7BF-JDYfL5AYAlGT6g3luRCmfZD1Tg",
  authDomain: "my-dedicated-hours-5943f.firebaseapp.com",
  projectId: "my-dedicated-hours-5943f",
  storageBucket: "my-dedicated-hours-5943f.firebasestorage.app",
  messagingSenderId: "657453825025",
  appId: "1:657453825025:web:a91e5970324eefef495400"
};

// 1. Googleの設計図（Config）をもとに、アプリとFirebaseの通信回線をカチッと開通（初期化）させる
const app = initializeApp(firebaseConfig);

// 2. 開通した回線から、今回の主役である超高速クラウドデータベース「Firestore（db）」の心臓部を起動！
export const db = getFirestore(app);
