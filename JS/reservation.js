// $ npm install firebase

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


$(document).ready(function () {
    // REGISTER DOM ELEMENTS
    const $title = $('#title');
    const $doc = $("#doc");

    // 初始化 Firebase
    firebase.initializeApp({
        apiKey: "AIzaSyBXw07IibowabISzFNPE6cwPQkI3QzX-4o",
        authDomain: "nerunekocafe.firebaseapp.com",
        projectId: "nerunekocafe",
        storageBucket: "nerunekocafe.app",
        messagingSenderId: "432971306395",
        appId: "1:432971306395:web:dee74a4692de2c9568fd3e",
        measurementId: "G-RS1WBQ7JGY"
    });

    let db = firebase.firestore();
    let usersRef = db.collection("users");

    // 綁定表單提交事件
    $('#reservation-form').on('submit', async function (e) {
        // 防止表單重新整理
        e.preventDefault(); 

        // 讀取表單輸入值
        const name = $('#name').get();
        const phone = $('#phone').get();
        const date = $('#date').get();
        const time = $('#time').get();
        const guests = $('#guests').get();
        const message = $('#message').get();

        // 新增資料到 Firebase Firestore
        try {
            await usersRef.add({
            name,
            phone,
            date,
            time,
            guests: parseInt(guests),
            message,
            createdAt: new Date()
        });

        //成功失敗提示
        alert('訂位成功！');
        // 重置表單
        $('#reservation-form')[0].reset(); 
        } catch (error) {
        console.error('❌ 訂位失敗:', error);
        alert('❌ 訂位失敗，請稍後再試。');
        }
    });
});