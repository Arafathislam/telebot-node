const dotenv = require('dotenv');
dotenv.config();

const {getAxiosInstance} =require("./axios");
const {errorHandler}=require("./helper");

const url =process.env.BASE_URL
const token= process.env.TELEGRAM_BOT_TOKEN

const telegram_url = `${url}/bot${token}`
//  const telegram_url = "https://api.telegram.org/bot6814546836:AAGLU_rWFnE3r4LO1AF3QaGVDnhESVXLlxk"


const axiosInstance = getAxiosInstance(telegram_url);
console.log("axios",axiosInstance)

 function sendMessage(chatId,messageText){
    return axiosInstance.get("sendMessage",{
        chat_id:chatId,
        text:messageText
    })
    .catch((ex)=>{ 
        errorHandler(ex,"sendMessage","axios");
    });
}

async function handleMessage(messageObj){
    // console.log(telegram_url);
    // console.log("message",messageObj);

    const messageText = messageObj.text || "";

    if(!messageText){
        errorHandler("No message text","handleMessage");
        return "";
    }



    try{

         const chatId = messageObj.chat.id;

         if(messageText.charAt(0)==="/"){
            const command = messageText.substr(1);
            switch(command){ 
                case "start":
                    return sendMessage(
                        chatId,
                        "hi i am traideas team"
                    );
                
                default:
                   return  sendMessage(chatId,"hey hi,i don't know that command.plz type agian !");
            }
         }else 
        return  sendMessage(chatId,messageText)

    }catch(error){
        errorHandler(error,"handleMessage");
    }


}




module.exports={sendMessage,handleMessage}