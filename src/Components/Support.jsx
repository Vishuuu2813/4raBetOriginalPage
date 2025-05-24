import React, { useState, useEffect } from 'react';

const Support = () => {
  const [time, setTime] = useState({
    hours: 2,
    minutes: 58,
    seconds: 32
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        let hours = prevTime.hours;
        let minutes = prevTime.minutes;
        let seconds = prevTime.seconds - 1;

        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }

        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }

        if (hours < 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <div className="logo">4RABET</div>
        
        <div className="blue-notification">
          <span>महत्वपूर्ण सूचना | 4rabet</span>
        </div>
        
        <div className="timer-container">
          <div className="loading-spinner"></div>
          <div className="timer-label">शेष समय:</div>
          <div className="countdown">
            <span className="time-value">{String(time.hours).padStart(2, '0')}</span>
            <span className="time-value"> घंटे </span>
            <span className="time-value">{String(time.minutes).padStart(2, '0')}</span>
            <span className="time-value"> मिनट </span>
            <span className="time-value">{String(time.seconds).padStart(2, '0')}</span>
            <span className="time-value"> सेकंड</span>
          </div>
        </div>
        
        <div className="warning-box red">
          <span className="warning-icon">⚠️</span>
          <span>बार-बार लॉगिन करने की कोशिश ना करें, अन्यथा आपकी आईडी ब्लॉक हो देन की जा सकती है।</span>
        </div>
        
        <div className="warning-box blue">
          <span>आपका डिवाइस या इंटरनेट कनेक्शन कोई भी समस्या हमारी टीम द्वारा 3 घंटे के अंदर सुलझा दी जाएगी।</span>
        </div>
        
        <div className="warning-box orange">
          <span>जिस लिंक से आपने लॉगिन किया है, वह हमारी ऑफिशियल टीम का हिस्सा है। कृपया किसी अन्य व्यक्ति से संपर्क ना करें — धोखाधड़ी के मामले बढ़ रहे हैं।</span>
        </div>
        
        <div className="warning-box light-blue">
          <span>"आपकी सुरक्षा, हमारी जिम्मेदारी - 4rabet टीम"</span>
        </div>
        
        <div className="contact-box">
          <div className="whatsapp-container">
            <div className="whatsapp-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#25D366">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
            </div>
            <span>व्हाट्सएप्प सपोर्ट: 9588030648</span>
          </div>
        </div>
      </div>
      
      <div className="footer">
        <span>© 2025 4rabet. सभी अधिकार सुरक्षित।</span>
        <div className="footer-contact">टीम से सम्पर्क करने के लिए मैसेजेस एवं चैट की आपकी सहमति करें।</div>
      </div>
      
      <style jsx>{`
        .main-container {
          background-color: #0f1a2b;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          color: white;
          font-family: Arial, sans-serif;
          padding: 20px 0;
        }
        
        .content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 700px;
        }
        
        .logo {
          font-size: 28px;
          font-weight: bold;
          margin: 20px 0 30px;
          color: white;
        }
        
        .blue-notification {
          background-color: #2762d9;
          color: white;
          padding: 15px 30px;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 25px;
          width: 80%;
          text-align: center;
        }
        
        .timer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 30px;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 4px solid #2762d9;
          animation: spin 1s linear infinite;
          margin-bottom: 10px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .timer-label {
          color: #8b9cb0;
          margin-bottom: 5px;
          font-size: 14px;
        }
        
        .countdown {
          color: #2762d9;
          font-size: 18px;
          font-weight: bold;
        }
        
        .time-value {
          color: #2762d9;
        }
        
        .time-unit {
          color: #8b9cb0;
        }
        
        .warning-box {
          width: 90%;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 15px;
          font-size: 14px;
          line-height: 1.5;
          display: flex;
          align-items: center;
        }
        
        .warning-box.red {
          background-color: #ffeded;
          border-left: 4px solid #ff0000;
          color: #c70000;
        }
        
        .warning-box.blue {
          background-color: #edf5ff;
          border-left: 4px solid #2762d9;
          color: #2762d9;
        }
        
        .warning-box.orange {
          background-color: #fff6ed;
          border-left: 4px solid #ff7300;
          color: #d76200;
        }
        
        .warning-box.light-blue {
          background-color: #f2f7ff;
          border-left: 4px solid #7ba6e8;
          color: #2762d9;
          text-align: center;
          justify-content: center;
        }
        
        .warning-icon {
          margin-right: 10px;
        }
        
        .contact-box {
          background-color: #f2fff7;
          padding: 15px;
          border-radius: 5px;
          width: 90%;
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
        }
        
        .whatsapp-container {
          display: flex;
          align-items: center;
          color: #0f9d58;
        }
        
        .whatsapp-icon {
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }
        
        .footer {
          font-size: 12px;
          color: #6d7a8c;
          text-align: center;
          margin-top: 20px;
        }
        
        .footer-contact {
          margin-top: 5px;
          max-width: 300px;
        }
      `}</style>
    </div>
  );
};

export default Support;